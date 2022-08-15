class DeckSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :format, :description, :card_id
end
