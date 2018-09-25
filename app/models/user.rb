# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  mount_base64_uploader :avatar, AvatarUploader
  validates :name, presence: true, length: { maximum: 50 }
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :user_request, dependent: :destroy, foreign_key: 'user_request', class_name: 'user_response'
  has_many :user_response, dependent: :destroy, foreign_key: 'user_response', class_name: 'user_response'
end
