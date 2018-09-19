Rails.application.routes.draw do
  get 'post/index'
  root 'posts#index'
  devise_for :users
  resources :posts do
    resources :likes
    resources :comments
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
