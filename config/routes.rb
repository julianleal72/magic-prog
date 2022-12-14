Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#me"
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :fixins, only: [:index]
  resources :collections
  resources :users
  resources :decks
  resources :cards

end
