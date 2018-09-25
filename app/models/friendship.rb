# frozen_string_literal: true

class Friendship < ApplicationRecord
  validates :user_request, presence: true
  validates :user_response, presence: true
end
