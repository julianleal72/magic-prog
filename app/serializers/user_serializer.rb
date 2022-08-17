class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :bio, :avatar
  has_many :collections
  has_many :decks, through: :collections
  has_many :cards, through: :collections
end
