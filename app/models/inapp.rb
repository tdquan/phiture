# frozen_string_literal: true

# Schema for Inapp
#
# t.string "name"
# t.string "description"
# t.string "title"
# t.string "content"
# t.string "image"
# t.bigint "user_id", null: false
# t.bigint "type_id", null: false
# t.index ["type_id"], name: "index_inapps_on_type_id"
# t.index ["user_id"], name: "index_inapps_on_user_id"
#
class Inapp < ApplicationRecord
  belongs_to :user
  belongs_to :type

  has_many :buttons, dependent: :destroy
end
