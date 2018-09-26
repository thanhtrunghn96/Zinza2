# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :post
  mount_uploaders :image, PhotoUploader
  validates :image, presence: true
end
