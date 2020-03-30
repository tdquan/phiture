# frozen_string_literal: true

# Sessions controller
class SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: :auth
  respond_to :json

  def auth
    render json: current_user
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
