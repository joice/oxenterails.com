require 'action_view'

module Helpers
  include ActionView::Helpers::TagHelper

  def variable(name)
    begin
      page.send(name)
    rescue
      return nil
    end
  end

  def layout_type
    variable('layout_type') || 'internal_page'
  end

  def css_tag(href, options = {})
    options[:rel] ||= 'stylesheet'
    options[:type] ||= 'text/css'
    options[:href] = static_url("/css/#{href}")
    options[:media] ||= 'screen'
    tag('link', options)
  end

  def script_tag(source, options = {})
    options[:src] = static_url("/js/#{source}")
    options[:type] ||= 'text/javascript'
    content_tag('script', '', options)
  end

  def image_tag(source, options = {})
    options[:src] = static_url("/images/#{source}")
    tag('img', options)
  end

  protected
  def static_url(base_url)
    path = File.join("#{File.expand_path(File.dirname(__FILE__))}", base_url)
    if File.exist?(path)
      base_url + '?' + File.new(path).ctime.to_time.to_i.to_s
    else
      base_url
    end
  end
end
