# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def render_resource(resource)
    if resource&.errors&.empty?
      render json: resource
    else
      resource_error(resource, 'validation')
    end
  end

  def resource_error(resource, type)
    case type
    when 'not_found'
      render json: error_hash(
        '404', 'Not Found', resource&.errors
      ), status: :not_found
    else
      render json: error_hash(
        '400', 'Bad Request', resource&.errors
      ), status: :bad_request
    end
  end

  private

  def error_hash(status, title, details)
    {
      errors: [
        {
          status: status,
          title: title,
          details: details
        }
      ]
    }
  end
end
