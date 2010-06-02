require File.expand_path(File.dirname(__FILE__) + '/_lib/jekyll_menu')
require File.expand_path(File.dirname(__FILE__) + '/_lib/juicer_helpers')

module Helpers
  include Jekyll::Menu
  include JuiceHelpers

  def variable(name)
    begin
      page.send(name)
    rescue
      return nil
    end
  end

  def value(obj, key)
    begin
      obj.send(key)
    rescue
      nil
    end
  end

  def layout_type
    variable('layout_type') || 'internal_page'
  end
end
