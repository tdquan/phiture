# frozen_string_literal: true

FactoryBot.define do
  factory :button do
    content { 'content' }
    link { 'link' }
    fill_color { 'fill_color' }
    border_color { 'border_color' }
  end
end
