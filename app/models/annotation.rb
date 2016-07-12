class Annotation < ApplicationRecord
  has_many :comments
  belongs_to :review
end
