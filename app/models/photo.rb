# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :post
  mount_base64_uploader :image, PhotoUploader
  validates :image, presence: true
end
