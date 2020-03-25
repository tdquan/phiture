# frozen_string_literal: true

FactoryBot.define do
  factory :type do
    title_margin_top { 'title_margin_top' }
    title_font_family { 'title_font_family' }
    title_font_size { 'title_font_size' }
    title_font_color { 'title_font_color' }
    title_line_height { 'title_line_height' }
    title_text_align { 'title_text_align' }
    content_margin_top { 'content_margin_top' }
    content_font_family { 'content_font_family' }
    content_font_size { 'content_font_size' }
    content_font_color { 'content_font_color' }
    content_line_height { 'content_line_height' }
    content_text_align { 'content_text_align' }
    content_margin_bottom { 'content_margin_bottom' }
    button_font_family { 'button_font_family' }
    button_font_size { 'button_font_size' }
    button_font_color { 'button_font_color' }
    button_letter_spacing { 'button_letter_spacing' }
    modal_radius { 'modal_radius' }
    header_height { 'header_height' }
    bottom_padding_top { 'bottom_padding_top' }
    bottom_padding_right { 'bottom_padding_right' }
    bottom_padding_bottom { 'bottom_padding_bottom' }
    bottom_padding_left { 'bottom_padding_left' }
    bottom_background_color { 'bottom_background_color' }
    close_circle_width { 'close_circle_width' }
    close_cross_width { 'close_cross_width' }
    close_cross_thickness { 'close_cross_thickness' }
  end
end
