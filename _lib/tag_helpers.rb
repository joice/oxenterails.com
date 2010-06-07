require 'action_view'

module TagHelpers
  include ActionView::Helpers::TagHelper

  def assets
    #"http://retironordestao.tink.com.br"
    nil
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

  private
  def static_url(base_url)
    path = File.join("#{File.expand_path(File.dirname(__FILE__))}", '..', base_url)
    if assets
      prefix = assets.split(',')
      base_url = prefix[rand(prefix.size)] + base_url
    end
    if File.exist?(path)
      base_url + '?' + File.new(path).ctime.to_time.to_i.to_s
    else
      base_url
    end
  end
end
