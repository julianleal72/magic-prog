class Deck < ApplicationRecord
    belongs_to :collection

    validates :user_id, :collection_id, :name, :format, presence: true
    validates :description, length: {maximum: 4500}
    validates :format, inclusion: {in: ["Progression", "Eternal", "Freeform"]}
end
