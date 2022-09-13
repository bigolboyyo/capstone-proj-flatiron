Rails.application.routes.draw do
  resources :backgrounds
  resources :characters
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get "/hello", to: "application#hello_world"

  post 'signup', to: "users#create"
  post '/login', to: "sessions#login"
  delete 'logout', to: "sessions#logout"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
