class AccessHistoriesController < ApplicationController
  def index
    access_histories = AccessHistory.all.order(id: 'desc').limit(15).map do |history|
      board = Board.find(history.board_id)
      thre = board.thres.find(history.thre_id)
      {
        board: board.ename,
        boardName: board.jname,
        thre: thre.num,
        title: thre.title,
      }
    end
    render json: access_histories
  end
end
