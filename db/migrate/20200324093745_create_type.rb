class CreateType < ActiveRecord::Migration[6.0]
  def change
    create_table :types do |t|
      t.string      :title_margin_top
      t.string      :title_font_family
      t.string      :title_font_size
      t.string      :title_font_color
      t.string      :title_line_height
      t.string      :title_text_align
      t.string      :content_margin_top
      t.string      :content_font_family
      t.string      :content_font_size
      t.string      :content_font_color
      t.string      :content_line_height
      t.string      :content_text_align
      t.string      :content_margin_bottom
      t.string      :button_font_family
      t.string      :button_font_size
      t.string      :button_font_color
      t.string      :button_letter_spacing
      t.string      :modal_radius
      t.string      :header_height
      t.string      :bottom_padding_top
      t.string      :bottom_padding_right
      t.string      :bottom_padding_bottom
      t.string      :bottom_padding_left
      t.string      :bottom_background_color
      t.string      :close_circle_width
      t.string      :close_cross_width
      t.string      :close_cross_thickness
      t.references  :user, null: false, foreign_key: true
    end
  end
end
