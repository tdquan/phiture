# frozen_string_literal: true

# Schema for Type:
#
# t.string "title_margin_top"
# t.string "title_font_family"
# t.string "title_font_size"
# t.string "title_font_color"
# t.string "title_line_height"
# t.string "title_text_align"
# t.string "content_margin_top"
# t.string "content_font_family"
# t.string "content_font_size"
# t.string "content_font_color"
# t.string "content_line_height"
# t.string "content_text_align"
# t.string "content_margin_bottom"
# t.string "button_font_family"
# t.string "button_font_size"
# t.string "button_font_color"
# t.string "button_letter_spacing"
# t.string "modal_radius"
# t.string "header_height"
# t.string "bottom_padding_top"
# t.string "bottom_padding_right"
# t.string "bottom_padding_bottom"
# t.string "bottom_padding_left"
# t.string "bottom_background_color"
# t.string "close_circle_width"
# t.string "close_cross_width"
# t.string "close_cross_thickness"
# t.bigint "user_id", null: false
# t.index ["user_id"], name: "index_types_on_user_id"
#
class Type < ApplicationRecord
  belongs_to :user

  has_one :inapp, foreign_key: :type_id, dependent: :destroy
end
