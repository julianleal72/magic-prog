class User < ApplicationRecord
    has_many :collections
    has_many :decks
    has_many :cards, through: :collections

    validates :username, :password_digest, presence: true
    validates :username, length: {minimum: 5, maximum: 15}, uniqueness: true
    validtes :bio, length: {maximum: 500}
end
