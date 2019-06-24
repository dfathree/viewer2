class RespsController < ApplicationController
  before_action :set_thre

  def index
    if params[:cache].blank?
      @thre.update_resps
    end


    if params[:bookmark].present?
      start = @thre.bookmark ? @thre.bookmark.bookmark_num : 1
      last  = start + 49
      resps = @thre.resps.where(num: start..last).order(:num)
    else
      resps = @thre.resps.order(:num)
    end

    render json: {
      resps: resps.map { |r|
        {
          num:      r.num,
          name:     r.name,
          userid:   r.userid,
          email:    r.email,
          wacchoi:  r.wacchoi,
          date:     r.date,
          contents: r.contents,
        }
      },
      bookmark: @thre.bookmark ? @thre.bookmark.bookmark_num : 0,
      total: @thre.resps.size,
    }

    AccessHistory.update(@thre)
  end

  def show
    if params[:resp_num] !~ /\A[0-9,-]+\z/
      return render json: { message: "invalid format #{params[:resp_num]}" }, status: 400
    end

    nums = params[:resp_num].split(',').map do |list|
      if list.index('-').nil?
        # - を含まない場合
        list.to_i
      elsif list =~ /\A-[0-9]+\z/
        # - で始まる場合
        1..list.gsub('-', '').to_i
      elsif list =~ /\A[0-9]+-\z/
        # - で終わる場合
        list.gsub('-', '').to_i..1002
      else
        md = list.split('-')
        md[0].to_i..md[1].to_i
      end
    end

    # 要求された最大レス番が現在保存しているレス数を超えていたら
    # ネットワークから最新のレスを取得する
    max_num = nums.reduce(1) { |a, b| [*a, *b].max }
    if max_num > @thre.resps.size
      @thre.update_resps
    end

    resps = @thre.resps.where(num: nums).order(:num)

    render json: {
      resps: resps.map { |r|
        {
          num:      r.num,
          name:     r.name,
          userid:   r.userid,
          email:    r.email,
          wacchoi:  r.wacchoi,
          date:     r.date,
          contents: r.contents,
        }
      },
      bookmark: @thre.bookmark ? @thre.bookmark.bookmark_num : 0,
      total: @thre.resps.size,
    }

    AccessHistory.update(@thre)
  end

  def delete_all
    @thre.resps.delete_all
    render head: :no_content
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
