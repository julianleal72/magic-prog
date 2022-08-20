class AddIconToDecks < ActiveRecord::Migration[7.0]
  def change
    add_column :decks, :icon, :string
  end
end
