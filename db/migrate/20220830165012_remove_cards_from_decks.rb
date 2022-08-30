class RemoveCardsFromDecks < ActiveRecord::Migration[7.0]
  def change
    remove_column :decks, :cards
  end
end
