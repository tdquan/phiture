# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User log out', type: :request do
  let(:url) { '/logout' }

  it 'returns 204, no content' do
    delete url
    expect(response).to have_http_status(204)
  end
end
