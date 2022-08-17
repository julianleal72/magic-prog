class RemoveUserIdFromDecks < ActiveRecord::Migration[7.0]
  def change
    remove_column :decks, :user_id
  end
end
