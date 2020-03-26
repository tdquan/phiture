# frozen_string_literal: true

# Schema for User:
#
# t.string "email", default: "", null: false
# t.string "encrypted_password", default: "", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.string "company"
# t.index ["email"], name: "index_users_on_email", unique: true
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable,
          :registerable,
          :jwt_authenticatable,
          jwt_revocation_strategy: JwtBlacklist

  has_many :types
  has_many :inapps
end
