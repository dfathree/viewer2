class BoardsController < ApplicationController
  # GET /api/boards
  def index
    boards = Board.all.map do |board|
      {
        ename: board.ename,
        jname: board.jname,
        server: board.server,
      }
    end
    render json: boards
  end

  # GET /api/boards/:board_name
  def show
    board = Board.find_by_ename(params[:board_name])
    render json: {
      ename: board.ename,
      jname: board.jname,
      server: board.server,
    }
  end
end
