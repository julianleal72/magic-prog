class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.integer :user_id
      t.integer :collection_id
      t.text  :info, default: {}
      t.timestamps
    end
  end
end
