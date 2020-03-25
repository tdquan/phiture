FactoryBot.define do
  factory :user do
    email { 'valid_user@email.com' }
    password { 'valid_password' }
    company { 'company_name' }
  end
end
