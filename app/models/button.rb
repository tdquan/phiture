# frozen_string_literal: true

# Schema for Button:
#
# t.string "content"
# t.string "link"
# t.string "fill_color"
# t.string "border_color"
# t.bigint "inapp_id", null: false
# t.index ["inapp_id"], name: "index_buttons_on_inapp_id"
#
class Button < ApplicationRecord
  belongs_to :inapp
end
