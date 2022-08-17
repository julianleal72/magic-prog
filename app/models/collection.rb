class Collection < ApplicationRecord
    belongs_to :user
    has_many :cards
    has_many :decks

    validates :user_id, :title, presence: true
end
