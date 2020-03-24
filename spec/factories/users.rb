FactoryBot.define do
  factory :user do
    email { 'valid_user@email.com' }
    password { 'valid_password' }
  end
end
