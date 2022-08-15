class RemoveUserIdFromCards < ActiveRecord::Migration[7.0]
  def change
    remove_column :cards, :user_id
  end
end
