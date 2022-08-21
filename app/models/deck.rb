class Deck < ApplicationRecord
    belongs_to :collection

    validates :collection_id, :name, :format, presence: true
    validates_uniqueness_of :name, scope: :collection
    validates :name, uniqueness: true
    validates :description, length: {maximum: 4500}
    validates :format, inclusion: {in: ["Progression", "Eternal", "Freeform"]}
end
