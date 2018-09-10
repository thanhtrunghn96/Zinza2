Rails.application.routes.draw do
  get 'post/index'
  root 'pages#home'
  devise_for :users
  resources :posts, only: [:index, :show, :create, :new, :destroy]
  post '/demo_ajax', to: 'posts#demo_ajax'
  post '/destroy_post', to: 'posts#destroy_post'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
