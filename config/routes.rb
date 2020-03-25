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

  resources :types do
    resources :inapps, only: [:index, :create]
  end

  resources :inapps, except: [:index, :create] do
    resources :buttons, only: [:index, :create]
  end

  resources :buttons, except: [:index, :create]
end
