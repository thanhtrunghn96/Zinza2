# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates :content, presence: true
  acts_as_notifiable :users,
                     targets: ->(comment, _key) {
                       ([comment.recipe.user] + comment.recipe.commented_users.to_a - [comment.user]).uniq
                     },
                     notifiable_path: :recipe_notificable_path

  def recipe_notificable_path
    recipe_path id: recipe.id
  end
end
