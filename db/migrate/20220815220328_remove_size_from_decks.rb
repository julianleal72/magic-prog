class RemoveSizeFromDecks < ActiveRecord::Migration[7.0]
  def change
    remove_column :decks, :size
  end
end
