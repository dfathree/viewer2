class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :jname
      t.string :ename, null: false
      t.string :server

      t.timestamps
    end
    add_index :boards, :ename, unique: true
  end
end
