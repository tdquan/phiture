# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User sign up', type: :request do
  let(:url) { '/signup' }
  let(:params) do
    {
      user: {
        email: 'new_user@email.com',
        password: 'valid_password'
      }
    }
  end

  context 'when user is new' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns a new user' do
      json = JSON.parse(response.body)
      expect(json['email']).to eq(params[:user][:email])
    end
  end

  context 'when user already exists' do
    before do
      create(:user, email: params[:user][:email])
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response).to have_http_status(400)
    end

    it 'returns bad request errors' do
      json = JSON.parse(response.body)
      expect(json['errors'].first['title']).to eq('Bad Request')
    end
  end
end
