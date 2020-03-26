# frozen_string_literal: true

# Controller methods for crud operations on the types for inapps
class TypesController < ApplicationController
  def index
    types = user_signed_in? ? current_user.types : Type.all
    render json: types
  end

  def new
    type = current_user.types.new
    inapp = current_user.inapps.new
    render json: { type: type, inapp: inapp }
  end

  def create
    type = current_user.types.new(type_params)
    inapp = current_user.inapps.new(inapp_params)
    ActiveRecord::Base.transaction do
      type.save!
      inapp.type = type
      inapp.save!
    end

    if type.persisted? && inapp.persisted?
      render json: { success: 'Your template has been created' }, status: :created
    else
      error_details = []
      type&.errors&.each { |err| error_details.append(err) }
      inapp&.errors&.each { |err| error_details.append(err) }
      render json: error_hash(
        '401', 'Bad Request', error_details
      ), status: :bad_request
    end
  end

  def edit
    type = current_user.types.find_by_id(params[:id])
    if type&.inapp
      render json: { type: type, inapp: type.inapp }
    else
      render json: error_hash(
        '404', 'Not Found', 'Type not found'
      ), status: :not_found
    end
  end

  private

  def type_params
    columns = Type.column_names.map(&:to_sym)
    columns.delete(:id)
    columns.delete(:user_id)
    params.require(:type).permit(*columns)
  end

  def inapp_params
    columns = Inapp.column_names.map(&:to_sym)
    columns.delete(:id)
    columns.delete(:user_id)
    columns.delete(:type_id)
    params.require(:inapp).permit(*columns)
  end
end
