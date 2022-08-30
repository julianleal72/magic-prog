class RemoveInfoFromCards < ActiveRecord::Migration[7.0]
  def change
    remove_column :cards, :info
  end
end
