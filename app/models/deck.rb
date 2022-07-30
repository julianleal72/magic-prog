class Deck < ApplicationRecord
    belongs_to :user

    validates :user_id, :name, :format, presence: true
    validates :description, length: {maximum: 4500}
end
