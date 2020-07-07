Rails.application.routes.draw do
  
  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }

  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :events
      resources :users, only: :index
    end
  end

  root to: 'events#index'
  resources :events
  
  
  #get '/app', to:'events#hello', as: 'app'
end
