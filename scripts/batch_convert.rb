#!/usr/bin/env ruby

# This file makes some pretty strong assumptions about directory structure and should only be run from a tmp dir

require 'fileutils'

base = 'assets'

files = Dir["#{base}/*.mp3"]
mp4s = Dir["#{base}/*.mp4"]

output = 'converted'
img_tmp = 'tmp_images'
img_cmp = 'compare'

images = true

[output, img_cmp, img_tmp].each do |folder|
  FileUtils.rm_rf(folder)
  FileUtils.mkdir(folder)
end

def run!(cmd)
  result = `#{cmd} 2>&1`
  raise "`#{cmd}` failed with: #{result}" unless $?.success?
  result
end

def sound_level(file)
  out = run!("ffmpeg -i '#{file}' -af 'volumedetect' -vn -sn -dn -f null /dev/null")
  level = out.match(/max_volume: (-[\d\.]+) dB/)[1]
  level.to_f
end

def target_level(file)
  current = sound_level(file)
  target = case file
  when /palatoalveolar_click/, /click_accompaniments/ then 5 # this click goes really high, so make it even higher
  when /high(_|er-mid).+vowel/ then -14
  when /vowel/, /_tone/ then -10
  when /(breathy|creaky)_voice/ then -8
  else
    -5
  end

  target - current
end


def thread_pool(input, threads: 10, &block)
  files = input.dup
  total = files.length
  processed = 0

  pool = threads.times.map do
    Thread.new do
      while f = files.pop
        block.call(f)
        processed += 1
        puts "processed #{processed} / #{total}" if processed % 25 == 0
      end
    end
  end
  pool.map(&:value)
end

thread_pool(files) do |f|
  basename = File.basename(f)
  out = "#{output}/#{basename}"

  target = target_level(f)
  run!("ffmpeg -i '#{f}' -af 'silenceremove=1:0:-55dB:0.09,volume=#{target}dB' -y '#{out}'")

  if images
    orig = "#{img_tmp}/#{basename}.orig.png"
    trim = "#{img_tmp}/#{basename}.trim.png"
    # convert the original
    run!("audiowaveform -i '#{f}' -o '#{orig}' -e 1.5 -w 400 --amplitude-scale 10")
    # convert the trimmed
    run!("audiowaveform -i '#{out}' -o '#{trim}' -e 1.5 -w 400 --amplitude-scale 10")
    combined = "#{img_cmp}/#{basename}.png"
    run!("convert +append '#{trim}' '#{orig}' '#{combined}'")
  end
rescue => e
  puts e
end

thread_pool(mp4s) do |f|
  basename = File.basename(f)
  out = "#{output}/#{basename}"

  target = target_level(f)
  run!("ffmpeg -i '#{f}' -af 'volume=#{target}dB' -c:v copy -movflags faststart -y '#{out}'")
end

FileUtils.rm_rf(img_tmp)
