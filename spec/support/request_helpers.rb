# frozen_string_literal: true
#
# Helpers for requests
module Request
  module SessionHelpers
    def decoded_token_from_header(headers)
      token_from_request = headers['Authorization'].split(' ').last
      JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
    end

    def sign_in(email, password)
      params = {
        user: {
          email: email,
          password: password
        }
      }
      post('/login', params: params)
    end
  end
end
