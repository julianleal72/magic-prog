class DeckSerializer < ActiveModel::Serializer
  attributes :id, :collection_id, :name, :format, :description, :card_id
end
