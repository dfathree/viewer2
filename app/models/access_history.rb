class AccessHistory < ApplicationRecord
  belongs_to :board
  belongs_to :thre

  def self.update(thre)
    history = find_or_create_by(thre_id: thre.id)
    history.update_attributes(board_id: thre.board.id)
    history.touch
  end

  def self.mra(board = nil)
    where(board_id: board).order(updated_at: 'DESC').limit(ACCESS_HISTORIES_LIMIT)
  end
end
