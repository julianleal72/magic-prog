class DeckSerializer < ActiveModel::Serializer
  attributes :id, :collection_id, :name, :format, :description, :cards, :icon
  belongs_to :collection
end
