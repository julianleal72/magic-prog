class CardSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :collection_id, :info
  belongs_to :collection
end
