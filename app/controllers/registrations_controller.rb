# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    begin
      resource.save
    rescue ActiveRecord::RecordNotUnique
      resource_error(resource, 'bad_request')
      return
    end
    render_resource(resource)
  end
end
