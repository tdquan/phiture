# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for  :users,
              path: '',
              path_names: {
                sign_in: 'login',
                sign_out: 'logout',
                registration: 'signup'
              },
              controllers: {
                sessions: 'sessions',
                registrations: 'registrations'
              }

  resources :types, only: [:new, :edit]
  resources :types do
    resources :inapps, only: [:index]
  end

  resources :inapps, only: [:show] do
    resources :buttons, only: [:index, :new, :create]
  end
  devise_scope :user do
    get '/auth', to: 'sessions#auth'
  end
end
