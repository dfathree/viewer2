class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :thre_id
      t.integer :bookmark_num

      t.timestamps
    end
  end
end
