class Event < ApplicationRecord
  #include Rails.application.routes.url_helpers

  belongs_to :user
  belongs_to :itinary
  accepts_nested_attributes_for :itinary
  has_one_attached :photo, dependent: :destroy 
  
  # def get_image_url
  #   #url_for(self.photo)
  #   polymorphic_url(self.photo)
  # end

end
