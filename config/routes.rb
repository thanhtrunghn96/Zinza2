# frozen_string_literal: true

Rails.application.routes.draw do
  get 'post/index'
  root 'posts#index'
  devise_for :users
  resources :posts do
    resources :likes
    resources :comments
  end
  resources :users
  resources :friendship
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
