class CreateAccessHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :access_histories do |t|
      t.integer :board_id
      t.integer :thre_id

      t.timestamps
    end
  end
end
