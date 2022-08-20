class AddCardsToDecks < ActiveRecord::Migration[7.0]
  def change
      add_column :decks, :cards, :json, default: {}
  end
end
