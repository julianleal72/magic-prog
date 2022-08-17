class AddCollectionIdToDecks < ActiveRecord::Migration[7.0]
  def change
    add_column :decks, :collection_id, :integer
  end
end
