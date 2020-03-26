# frozen_string_literal: true

require 'rails_helper'

# Visit the page to create new template
describe 'new inapp_type', type: :request do
  let(:user) { create(:user) }

  context 'when user not signed-in' do
    let(:url) { new_type_url }

    it 'returns 401' do
      get url
      expect(response).to have_http_status(401)
    end
  end

  context 'when initializing a new inapp_type' do
    let(:url) { new_type_url }
    before do
      sign_in(user.email, user.password)
      headers = { 'Authorization': response.headers['Authorization'] }
      get url, headers: headers
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns a new type' do
      json = JSON.parse(response.body)
      expect(json['type']).to be_present
    end

    it 'returns a new inapp' do
      json = JSON.parse(response.body)
      expect(json['inapp']).to be_present
    end

    it 'returns a type and an inapp for current user' do
      json = JSON.parse(response.body)
      expect(json['type']['user_id']).to eq(user.id)
      expect(json['inapp']['user_id']).to eq(user.id)
    end
  end
end

# Visit the page to edit an existing template
describe 'edit inapp_type' do
  let(:user) { create(:user) }
  let(:url) { type_url(type.id) }
  let(:edit_url) { edit_type_url(type.id) }

  context 'when inapp_type exists' do
    let!(:type) { create(:type, user: user) }
    let!(:inapp) { create(:inapp, user: user, type: type) }
    before do
      sign_in(user.email, user.password)
      headers = { 'Authorization': response.headers['Authorization'] }
      get edit_url, headers: headers
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns a type and an inapp for the current user' do
      json = JSON.parse(response.body)
      expect(json['type']['title_margin_top']).to be_present
      expect(json['type']['user_id']).to eq(user.id)
      expect(json['inapp']['content']).to be_present
      expect(json['inapp']['user_id']).to eq(user.id)
      expect(json['inapp']['type_id']).to eq(type.id)
    end
  end

  context 'when inapp_type does NOT exist' do
    let(:type) { build(:type, id: 42) }
    before do
      sign_in(user.email, user.password)
      headers = {'Authorization': response.headers['Authorization'] }
      get edit_url, headers: headers
    end

    it 'returns 404' do
      json = JSON.parse(response.body)
      expect(response).to have_http_status(404)
      expect(json['errors']).not_to be_empty
    end
  end
end

# Create a new template
describe 'create inapp_type' do
  let(:user) { create(:user) }
  let(:url) { types_url }
  before do
    sign_in(user.email, user.password)
    headers = {
      'Authorization': response.headers['Authorization'],
      'Content-Type': 'application/json'
    }
    post url, headers: headers, params: params
  end

  context 'with valid params' do
    let!(:type) { build(:type, user: user) }
    let!(:inapp) { build(:inapp, user: user, type: type) }
    let(:params) do
      {
        type: type,
        inapp: inapp
      }.to_json
    end

    it 'returns 201' do
      expect(response).to have_http_status(201)
    end
  end
end

# Update an existing template
describe 'update inapp_type' do
  let(:user) { create(:user) }
  let(:url) { type_url(type.id) }
  before do
    sign_in(user.email, user.password)
    headers = {
      'Authorization': response.headers['Authorization'],
      'Content-Type': 'application/json'
    }
    put url, headers: headers, params: params
  end

  context 'with valid params' do
    let!(:type) { create(:type, user: user) }
    let!(:inapp) { create(:inapp, user: user, type: type) }
  end
end
