# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User log in', type: :request do
  let(:user) { create(:user) }
  let(:url) { '/login' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'with valid params' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'return JWT token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      token_from_request = response.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'with invalid params' do
    before { post url }

    it 'returns unauthorized status(401)' do
      expect(response.status).to eq 401
    end
  end
end
