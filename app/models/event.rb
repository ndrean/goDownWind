class Event < ApplicationRecord
  belongs_to :user
  belongs_to :itinary
  accepts_nested_attributes_for :itinary
  #accepts_nested_attributes_for :user
end
