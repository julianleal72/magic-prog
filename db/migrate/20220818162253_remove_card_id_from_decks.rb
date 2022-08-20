class RemoveCardIdFromDecks < ActiveRecord::Migration[7.0]
  def change
    remove_column :decks, :card_id
  end
end
