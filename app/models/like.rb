# frozen_string_literal: true

class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post
  # validates :user_id, uniqueness: { scope: :post_id}
  # validates_uniqueness_of :user_id, :post_id
end
