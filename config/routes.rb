Rails.application.routes.draw do
  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }

  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :events, only: [:index, :create, :update, :destroy, :show]
      resources :users, only: :index
    end
  end

  root to: 'events#index'

  mount Sidekiq::Web => '/sidekiq'
    

end

