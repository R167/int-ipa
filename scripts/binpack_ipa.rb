#!/usr/bin/env ruby
# frozen_string_literals: true

require "msgpack"
require "yaml"
require "optparse"
require "tempfile"
require "tmpdir"
require "set"
require "uri"

class Runner
  # Asserts that a shell command exists
  def assert_cli!(*commands)
    missing_commands = commands.each do |c|
      err "missing required commands: #{missing_commands.inspect}" unless system("which #{c} > /dev/null")
    end
  end

  WILL_STYLER = "https://wstyler.ucsd.edu/talks/ipa/"

  def initialize(args)
    @args = args.dup
    @errors = []

    @input_file = nil
    @output_file = nil
    @source = nil
    @temp_source = true
    @verbose = false
    @download = true
    @override = false
    @video = false
    @use_base = false

    parse!
    assert_cli!('aria2c')
    assert_args!
    maybe_fail!
  end

  def options
    @options ||= OptionParser.new do |opts|
      opts.banner = "Usage: #{$0} [options]"

      opts.on("-i", "--input YAML", "Input file") do |input|
        @input_file = input
      end

      opts.on("-o", "--output MSGPACK", "Output file") do |output|
        @output_file = output
      end

      opts.on("-s", "--sources FOLDER", "A local directory to pull files from/download to") do |folder|
        @source = folder
        @temp_source = false
      end

      opts.on("-l", "--local", "Skip downloads and only pull from the local source") do
        @download = false
      end

      opts.on("-v", "--verbose", "Verbose mode") do |verbosity|
        @verbose = verbosity
      end

      opts.on("--video", "Also download video files") do
        @video = true
      end

      opts.on("--respect-base-url", "Use the baseUrl in the manifest") do
        @use_base = true
      end

      opts.on("-h", "--help", "Print this help message") do
        puts options
        exit
      end
    end
  end

  def parse!
    options.parse(@args)
  end

  def assert_args!
    err "No input specified" unless @input_file
    err "No output specified" unless @output_file
    err "Cannot download videos without specifying a sources directory" if @video && @temp_source
    err "Video download requires non-local mode" if @video && !download?
  end

  # Add a failure message
  def err(msg)
    @errors << msg
  end

  def download?
    @download
  end

  def confirm_destroy
    unless @override
      print "Write to a non-empty directory? [yN]: "
      exit 1 unless STDIN.gets.downcase[0] == "y"
    end
  end

  def maybe_fail!
    unless @errors.empty?
      STDERR.puts options
      STDERR.puts @errors.join("\n")
      exit 1
    end
  end

  def escape(string)
    encoding = string.encoding
    string.b.gsub(/([^a-zA-Z0-9_\.\-~]+)/) do |m|
      '%' + m.unpack('H2' * m.bytesize).join('%').upcase
    end.force_encoding(encoding)
  end

  def download_files(base_url, files)
    Tempfile.create do |uris|
      commands = files.map { |f| "#{base_url + escape(f)}\n\tout=#{f}" }.join("\n")
      verbose commands

      uris.write(commands)
      uris.flush

      cmd!("aria2c -i '#{uris.path}' -j 10 -d '#{@source}' --auto-file-renaming false --allow-overwrite true", fail: false)

      failed = files - Dir[File.join(@source, "*")].map{|f| File.basename(f)}
      unless failed.empty?
        puts "Skipping #{failed.length} missing files at #{base_url}:"
        puts failed
      end
    end
  end

  def verbose(line)
    puts line if @verbose
  end

  def cmd!(cmd, fail: true)
    output = `#{cmd} 2>&1`
    verbose output
    raise "`#{cmd}` failed with output: #{output}" if fail && !$?.success?
    output
  end

  def paths(data, key)
    symbols = []
    data[:symbols].each do |symbol|
      symbols << symbol[key]
    end

    data[:additionalSections].each do |section|
      section[:symbols].each do |symbol|
        symbols << symbol[key]
      end
    end

    symbols.sort!.uniq!
    # Reject any "complex" paths
    symbols.reject! do |symbol|
      symbol&.match?(/\/|:/).tap { |m| verbose "Ignoring '#{symbol}'" if m }
    end

    symbols
  end

  def run!
    data = YAML.safe_load_file(@input_file, aliases: true, symbolize_names: true)
    base_url = URI.parse(@use_base ? data[:baseUrl] : WILL_STYLER)

    symbols = paths(data, :audio)

    setup!

    puts "Found #{symbols.length}"

    if download?
      confirm_destroy unless Dir.empty?(@source)
      if @video
        symbols.concat(paths(data, :video))
      end
      download_files(base_url, symbols)
    end

    File.open(@output_file, "w") do |f|
      f.write(create_pack(symbols))
    end
  ensure
    verbose "running cleanup"
    cleanup!
  end

  def create_pack(symbols)
    pack = {}
    skip = 0
    symbols.each do |symbol|
      source = File.join(@source, symbol)
      if File.exist?(source)
        pack[symbol] = File.open(source, "rb", &:read)
      else
        skip += 1
        verbose "#{symbol} doesn't exist"
      end
    end
    puts "No data for #{skip} files" if skip > 0

    pack.to_msgpack
  end

  def setup!
    @source = Dir.mktmpdir("files") if @temp_source
  end

  def cleanup!
    FileUtils.remove_entry(@source) if @temp_source
  end
end

if __FILE__ == $0
  Runner.new(ARGV).run!
end
