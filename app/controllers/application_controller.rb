# frozen_string_literal: true

class ApplicationController < ActionController::API
  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      resource_error(resource, 'validation')
    end
  end

  def resource_error(resource, type)
    case type
    when 'not_found'
      render json: error_hash(
        '404', 'Not Found', resource.errors, '100'
      ), status: :not_found
    else
      render json: error_hash(
        '400', 'Bad Request', resource.errors, '100'
      ), status: :bad_request
    end
  end

  private

  def error_hash(status, title, details, code)
    {
      errors: [
        {
          status: status,
          title: title,
          details: details,
          code: code
        }
      ]
    }
  end
end
