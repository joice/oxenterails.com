require File.expand_path(File.dirname(__FILE__) + '/tag_helpers')
require File.expand_path(File.dirname(__FILE__) + '/juicer')

module JuiceHelpers
  include TagHelpers

  def juice_css(files, target = :all)
    path = juice_it(:css, files, target)
    css_tag path
  end

  def juice_js(files, target = :all)
    path = juice_it(:js, files, target)
    script_tag path
  end

  private
  def juice_it(type, files, target)
    Juicer.merge(files, type, target, assets)
  end
end
