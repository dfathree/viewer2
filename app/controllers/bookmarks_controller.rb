class BookmarksController < ApplicationController
  before_action :set_thre
  protect_from_forgery

  def show
    if @thre.bookmark
      render json: { bookmark: bookmark_num }
    else
      render json: { bookmark: nil }
    end
  end

  def new
    bookmark_num = params[:bookmark]
    if bookmark_num.nil?
      return render json: {message: 'no bookmark'}, :status => 400
    end

    bm = Bookmark.find_or_create_by(thre: @thre)
    bm.update_attributes(bookmark_num: bookmark_num)
    render json: { bookmark: bm.bookmark_num }
  end

  def delete
    bookmark = @thre.bookmark
    bookmark.destroy if bookmark
    head :no_content
  end

  private
  def set_thre
    @board = Board.find_by_ename(params[:board_name])
    if @board.nil?
      render json: { message: "#{params[:board_name]} not found"}, status: 404
    end
    @thre = @board.thres.find_by_num(params[:thre_num])
    if @thre.nil?
      render json: { message: "#{params[:thre_num]} not found"}, status: 404
    end
  end
end
