class CreateFixins < ActiveRecord::Migration[7.0]
  def change
    create_table :fixins do |t|
      t.string :code
      t.text :symbol
      t.text :booster
      t.timestamps
    end
  end
end
