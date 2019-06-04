class Board < ApplicationRecord
  has_and_belongs_to_many :genres
  has_many :thres
  has_many :access_histories

  validates :ename, uniqueness: true

  def update_thres
    raw_res = get_thres
    return if raw_res.nil?

    thre_list = parse_thre(raw_res)
    
    queries = []
    thre_list.each do |thre|
      t = thres.find_or_create_by(num: thre[:num])
      t.title = thre[:title]
      queries << t
    end
    Thre.import queries, on_duplicate_key_update: { conflict_target: [:id], columns: [:title] }
    queries
  end

  private
  def get_thres
    uri = URI.parse("#{server}/#{ename}/subback.html")
    Net::HTTP.start(uri.host, uri.port) do |http|
      res = http.get(uri.path, 'User-Agent' => USER_AGENT)
      if res.kind_of? Net::HTTPOK
        return res.body
      else
        return nil
      end
    end
  end

  def parse_thre(html)
    thres = []

    return thres if html.nil?

    html.each_line do |line|
      line.match(/<a href="([0-9]+)\/l50">[0-9]+: (.+)<\/a>/) do |t|
        doc = Nokogiri::HTML.parse(line, nil, 'Shift_JIS')
        num = doc.at_css('a')[:href].gsub(/\/l50/, '')
        title = doc.at_css('a').text
        thres << { num: num, title: title }
      end
    end

    return thres
  end
end
