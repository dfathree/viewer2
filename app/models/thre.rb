class Thre < ApplicationRecord
  belongs_to :board
  has_many :resps
  has_one :bookmark, dependent: :destroy
  has_one :access_history, dependent: :destroy

  validates :num, uniqueness: { scope: [ :board_id ]}

  def update_resps
    length = resps.size
    start_num = length + 1

    raw_res = get_resps(start_num)
    return if raw_res.nil?

    resp_list = parse_resp(raw_res)

    queries = []
    resp_list.each do |resp|
      r = resps.find_or_create_by(num: resp[:id])
      r.name     = resp[:name]
      r.userid   = resp[:userid]
      r.email    = resp[:email]
      r.wacchoi  = resp[:wacchoi]
      r.date     = resp[:date]
      r.contents = resp[:contents]
      queries << r
    end
    Resp.import queries, on_duplicate_key_update: {
      conflict_target: [:id],
      columns: [:name, :userid, :email, :wacchoi, :date, :contents]
    }
    queries
  end

  private
  def get_resps(start_num)
    uri = URI.parse("#{board.server}/test/read.cgi/#{board.ename}/#{num}/#{start_num}-")
    Net::HTTP.start(uri.host, uri.port) do |http|
      res = http.get(uri.path, 'User-Agent' => USER_AGENT)
      if res.kind_of? Net::HTTPOK
        return res.body
      else
        return nil
      end
    end
  end

  def parse_resp(html)
    doc = Nokogiri::HTML.parse(html, nil, 'Shift_JIS')

    # 新しいタイプ
    if doc.at_css('div.thread')
      return parse_new_format(doc)
    end

    # 古いタイプ
    if doc.at_css('dl.thread')
      return parse_old_format(doc)
    end

    # pinkタイプ
    if doc.at_css('dl.post')
      return parse_pink_format(doc)
    end
  end

  def parse_new_format(doc)
    resps = []

    doc.css('div.post').each do |parent|
      res = {:id => 0}
      res[:id] = parent.attributes['id'].to_s
      res[:userid] = parent.attributes['data-userid'].to_s

      name_tag = parent.at_css('.name')
      a_href = name_tag.at_css('a')
      if a_href
        # メールあり
        res[:email] = a_href.attributes['href'].to_s.gsub(/mailto:/, '')
        res[:name] = a_href.content
      else
        # メールなし
        res[:email] = ''
        res[:name] = name_tag.at_css('b').content
      end

      res[:wacchoi] = ''
      name_tag.to_s.match(/<\/b>(.*)<b>/) do |m|
        res[:wacchoi] = m[1]
      end

      # &. はUTF-8への変換に失敗して date_str_arr が読み取れない場合への対策
      date_str_arr = parent.at_css('.date')&.content&.split(' ')

      # date_str_arr[1].presenceはあぼーん対策
      res[:date] = date_str_arr[0] + ' ' + (date_str_arr[1].presence || '')

      # &. はUTF-8への変換に失敗して res[:contents] が読み取れない場合への対策
      res[:contents] = parent.at_css('div.message')&.inner_html

      resps << res
    end

    return resps
  end

  def parse_old_format(doc)
    resps = []

    doc.css('dt').each do |parent|
      res = {:id => 0}

      id_matched = parent.children.first.content.match(/^([0-9]+)/)
      res[:id] = id_matched[1]

      a_href = parent.at_css('a')
      if a_href
        # メールあり
        res[:email] = a_href.attributes['href'].to_s.gsub(/mailto:/, '')
        res[:name] = a_href.content
      else
        # メールなし
        res[:email] = ''
        res[:name] = parent.at_css('font b').content
      end

      date_id_text = parent.children.last.to_s
      date_id_text.gsub!(/^[^0-9]*/, '')

      sp = date_id_text.split(' ')
      res[:date] = sp[0] + ' ' + sp[1]
      res[:userid] = sp[2].presence || ''

      res[:wacchoi] = ''
      parent.to_s.match(/<\/b>(.*)<b>/) do |m|
        res[:wacchoi] = m[1]
      end

      resps << res
    end

    doc.css('dd').each_with_index do |parent, index|
      resps[index][:contents] = parent.inner_html
    end

    return resps
  end

  def parse_pink_format(doc)
    resps = []

    doc.css('dl.post').each do |parent|
      res = {:id => 0}
      res[:id] = parent.attributes['id'].to_s
      res[:userid] = parent.attributes['data-userid'].to_s

      span_name = parent.at_css('span.name')
      a_href = span_name.at_css('a')
      if a_href
        # メールあり
        res[:email] = a_href.attributes['href'].to_s.gsub(/mailto:/, '')
        res[:name] = a_href.content
      else
        # メールなし
        res[:email] = ''
        res[:name] = span_name.at_css('b').content
      end

      res[:wacchoi] = ''

      date_str_arr = parent.at_css('span.date').content.split(' ')
      # date_str_arr[1].presenceはあぼーん対策
      res[:date] = date_str_arr[0] + ' ' + (date_str_arr[1].presence || '')

      res[:contents] = parent.at_css('dd').inner_html

      resps << res
    end

    return resps
  end
end
