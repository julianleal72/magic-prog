class Card < ApplicationRecord
    belongs_to :collection

    validates :user_id, :collection_id, :info, presence: true
end
