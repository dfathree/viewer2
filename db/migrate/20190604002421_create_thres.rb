class CreateThres < ActiveRecord::Migration[5.2]
  def change
    create_table :thres do |t|
      t.integer :board_id, null: false
      t.string :num, null: false
      t.string :title

      t.timestamps
    end
    add_index :thres, [:board_id, :num], unique: true
  end
end
