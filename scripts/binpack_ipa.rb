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

  def initialize(args)
    @args = args.dup
    @errors = []

    @input_file = nil
    @output_file = nil
    @source = nil
    @verbose = false

    @input_type = :download

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

      opts.on("-l", "--local-source FOLDER", "A local directory to pull files from") do |folder|
        @source = folder
        @input_type = :local
      end

      opts.on("-v", "--verbose", "Verbose mode") do |verbosity|
        @verbose = verbosity
      end


      opts.on("-h", "--help", "Print this help message") do
        puts options
        exit
      end
    end
  end

  def parse!
    options.parse!(@args)
  end

  def assert_args!
    err "No input specified" unless @input_file
    err "No output specified" unless @output_file
  end

  # Add a failure message
  def err(msg)
    @errors << msg
  end

  def download?
    @input_type == :download
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

      cmd!("aria2c -i '#{uris.path}' -j 10 -d '#{@source}'", fail: false)

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

  def run!
    data = YAML.safe_load_file(@input_file, aliases: true, symbolize_names: true)
    symbols = []

    base_url = URI.parse(data[:baseUrl])

    data[:symbols].each do |symbol|
      symbols << symbol[:audio]
    end

    data[:additionalSections].each do |section|
      section[:symbols].each do |symbol|
        symbols << symbol[:audio]
      end
    end

    symbols.sort!.uniq!
    # Reject any "complex" paths
    symbols.reject! do |symbol|
      symbol.match?(/\/|:/).tap { |m| verbose "Ignoring '#{symbol}'" if m }
    end

    setup!

    puts "Found #{symbols.length}"

    download_files(base_url, symbols) if download?
    File.open(@output_file, "w") do |f|
      f.write(create_pack(symbols))
    end
  ensure
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
    @source = Dir.mktmpdir("files") if download?
  end

  def cleanup!
    FileUtils.remove_entry(@source) if download?
  end
end

if __FILE__ == $0
  Runner.new(ARGV).run!
end
