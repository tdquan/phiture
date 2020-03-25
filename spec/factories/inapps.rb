# frozen_string_literal: true

FactoryBot.define do
  factory :inapp do
    name { 'name' }
    description { 'description' }
    title { 'title' }
    content { 'content' }
    image { 'image' }
  end
end
