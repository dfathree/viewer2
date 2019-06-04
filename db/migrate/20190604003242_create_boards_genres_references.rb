class CreateBoardsGenresReferences < ActiveRecord::Migration[5.2]
  def change
    create_table :boards_genres, id: false do |t|
      t.references :board, index: true, null: false
      t.references :genre, index: true, null: false
    end
  end
end
