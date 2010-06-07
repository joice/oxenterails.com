require 'singleton'

class Juicer
  include Singleton
  attr_accessor :assets, :type, :files, :target

  def initialize
    %w(css js).each do |type|
      `rm -rf #{type}/bundled*.#{type}`
    end
  end

  def self.merge(files, type, target, assets)
    instance.type   = type
    instance.files  = files
    instance.target = target
    instance.assets = assets
    instance.merge_files
  end

  def merge_files
    unless there_is_bundle_for?(bundle_complete_path)
      `juicer merge #{files_paths} -o #{bundle_complete_path} #{' -h ' + assets if assets} #{' -l ' + assets if assets} --document-root #{Dir.pwd} --ignore-problems --force`
    end
    bundle_path
  end

  def bundle_complete_path
    "#{type}/bundled.#{target}.min.#{type}"
  end

  def bundle_path
    "bundled.#{target}.min.#{type}"
  end

  def there_is_bundle_for?(path)
    File.exists? path
  end

  def files_paths
    files.inject('') { |partial, file| partial.concat("#{type}/#{file}.#{type} ") }
  end
end
