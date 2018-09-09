class Post < ApplicationRecord
  belongs_to :user
  has_many :photos, dependent: :destroy
  default_scope -> {order(created_at: :desc)}
  #allow_destroy:true cho phep xoa ban ghi con
  # accepts_nested_attributes_for :photos, allow_destroy: true
  validates :content, presence: true
end