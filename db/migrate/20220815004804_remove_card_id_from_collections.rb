class RemoveCardIdFromCollections < ActiveRecord::Migration[7.0]
  def change
    remove_column :collections, :card_id
  end
end
