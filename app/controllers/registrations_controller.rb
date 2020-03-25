# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    begin
      resource.save
    rescue ActiveRecord::RecordNotUnique
      resource.errors.add(:email, 'already taken')
    end
    render_resource(resource)
  end
end
