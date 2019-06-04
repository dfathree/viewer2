class CreateResps < ActiveRecord::Migration[5.2]
  def change
    create_table :resps do |t|
      t.integer :thre_id, null: false
      t.integer :num
      t.string :name
      t.string :email
      t.string :date
      t.string :userid
      t.string :wacchoi
      t.text :contents

      t.timestamps
    end
  end
end
