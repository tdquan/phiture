# frozen_string_literal: true

# Sessions controller
class SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: :auth
  respond_to :json

  def auth
    token_from_request = request.headers['Authorization'].split(' ').last
    decoded = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
    user = User.find(decoded.first['sub'])
    payload = {
      user: user,
      token: request.headers['Authorization']
    }
    render json: payload
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
