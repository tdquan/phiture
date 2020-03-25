# frozen_string_literal: true

# Controller methods for crud operations on the types for inapps
class TypesController < ApplicationController
  def index
    @types = user_signed_in? ? current_user.types : Type.all
    render json: @types
  end
end
