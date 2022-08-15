class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description
  has_many :cards
end
