class AddIconToCollections < ActiveRecord::Migration[7.0]
  def change
    add_column :collections, :icon, :string
  end
end
