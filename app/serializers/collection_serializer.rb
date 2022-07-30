class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title
  has_many :cards
end
