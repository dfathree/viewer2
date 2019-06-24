class ThresController < ApplicationController
  before_action :set_board

  def index
    if params[:cache].blank?
      thres = @board.update_thres
    else
      # title に "1: ", "2: " と含まれるものを順に抽出する
      thres = (1..20).map { |n|
        @board.thres.where('title like ?', "#{n}: %").order(updated_at: 'DESC').first
      }.filter { |n| n }
    end

    render json: thres.map { |t|
      {
        num: t.num,
        title: t.title,
      }
    }
  end

  def show
    thre = @board.thres.find_by_num(params[:thre_num])
    bookmark = thre.bookmark
    bookmark_num = bookmark ? bookmark.bookmark_num : 0
    render json: {
      board_id: thre.board.ename,
      thre_id: thre.num,
      title: thre.title,
      bookmark: bookmark_num,
    }
  end

  private
  def set_board
    @board = Board.find_by_ename(params[:board_name])
    if @board.nil?
      render json: { message: "#{params[:board_name]} not found"}, status: 404
    end
  end
end
