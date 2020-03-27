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
    inapp.buttons.new
    render json: { type: type, inapp: inapp, buttons: inapp.buttons }
  end

  def create
    type = current_user.types.new(type_params)
    inapp = current_user.inapps.new(inapp_params)
    ActiveRecord::Base.transaction do
      type.save!
      inapp.type = type
      inapp.save!
      button_params[:button_attrs].each { |_, param| inapp.buttons.create!(param) }
    end

    if type.persisted? && inapp.persisted?
      render json: {
        success: 'Your template has been created'
      }, status: :created
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
    type = current_user.types.find(params[:id])
    render json: { type: type, inapp: type.inapp, buttons: type.buttons }
  end

  def update
    type = current_user.types.find(params[:id])
    inapp = type&.inapp
    buttons = inapp&.buttons

    ActiveRecord::Base.transaction do
      type.update!(type_params)
      inapp.update!(inapp_params)
      button_params[:button_attrs].each do |_, param|
        Button.find(param['id']).update!(param)
      end
    end

    render json: {
      type: type,
      inapp: inapp,
      buttons: buttons
    }, status: 200
  end

  private

  def type_params
    columns = %i[
      title_margin_top
      title_font_family
      title_font_size
      title_font_color
      title_line_height
      title_text_align
      content_margin_top
      content_font_family
      content_font_size
      content_font_color
      content_line_height
      content_text_align
      content_margin_bottom
      button_font_family
      button_font_size
      button_font_color
      button_letter_spacing
      modal_radius
      header_height
      bottom_padding_top
      bottom_padding_right
      bottom_padding_bottom
      bottom_padding_left
      bottom_background_color
      close_circle_width
      close_cross_width
      close_cross_thickness
    ]
    params.require(:type).permit(*columns)
  end

  def inapp_params
    columns = %i[name description title content image type_id]
    params.require(:inapp).permit(*columns)
  end

  def button_params
    columns = %i[id content link fill_color border_color inapp_id]
    params.require(:buttons).permit(button_attrs: columns)
  end
end
