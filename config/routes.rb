Rails.application.routes.draw do
  
  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/seesions' }

  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :events
    end
  end

  root to: 'events#index'
  resources :events
  
  #get '/app', to:'events#hello', as: 'app'
end
