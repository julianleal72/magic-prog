class User < ApplicationRecord
    has_many :collections
    has_many :cards, through: :collections
    has_many :decks, through: :collections
    has_secure_password
    
    validates :username, :password, presence: true
    validates :username, length: {minimum: 5, maximum: 15}, uniqueness: true
    validates :username, length: {minimum: 4}
    validates :bio, length: {maximum: 500}
end
