class Card < ApplicationRecord
    belongs_to :collection

    validates :user_id, :collection_id, presence: true
    validates :info, presence: true
end
