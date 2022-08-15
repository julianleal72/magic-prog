class Card < ApplicationRecord
    belongs_to :collection

    validates :collection_id, :info, presence: true
end
