require 'net/http'
require 'uri'

BBS_URL = 'http://menu.5ch.net/bbsmenu.html'

class Genre < ApplicationRecord
  has_and_belongs_to_many :boards

  def self.update_genres
    raw_res = self.get_bbsmenu
    return if raw_res.nil?

    genres = self.parse_genre(raw_res)

    if genres[:genres].empty? || genres[:boards].empty?
      return false
    end

    Genre.delete_all
    genres[:genres].each do |genre|
      g = Genre.create(:name => genre)

      boards = []
      genres[:boards][genre].each do |b|
        board = Board.find_or_create_by(ename: b[:ename])
        board.update_attributes({ server: b[:server], jname: b[:jname] })
        g.boards << board
      end
    end
  end

  private
  def self.get_bbsmenu
    uri = URI.parse(BBS_URL)
    Net::HTTP.start(uri.host, uri.port) do |http|
      res = http.get(uri.path, 'User-Agent' => USER_AGENT)
      if res.kind_of? Net::HTTPOK
        return res.body
      else
        return nil
      end
    end
  end

  def self.parse_genre(html)
    genres = []
    boards = {}
    current_genre = nil

    # HTMLがちゃんとした階層構造を取っていないので
    # 1行ずつ正規表現でチェックする必要がある
    html.encode('UTF-8', 'Shift_JIS').each_line do |line|
      line.match(/<B>(.+)<\/B>/) do |g|
        current_genre = g[1]
        genres.push(current_genre)
        boards[current_genre] = []
      end

      next if boards[current_genre].nil?

      line.match(/<A HREF=(.+)>(.+)<\/A>/) do |b|
        uri = URI.parse(b[1])
        break if uri.port.nil?

        boards[current_genre] << {
          :server => uri.scheme + '://' + uri.host,
          :ename => uri.path.gsub(/\//, ''),
          :jname => b[2]
        }
       end
    end

    {:genres => genres, :boards => boards}
  end
end
