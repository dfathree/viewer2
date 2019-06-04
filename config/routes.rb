Rails.application.routes.draw do
  resources :access_histories

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # for JSON
  # ジャンル一覧
  get    '/api/genres' => 'genres#index'
  get    '/api/genres/update' => 'genres#update'

  # 板一覧(たいした情報は入っていない)
  get    '/api/boards' => 'boards#index'

  # 板情報(たいした情報は入っていない)
  get    '/api/boards/:board_name' => 'boards#show'

  # スレ一覧
  get    '/api/boards/:board_name/thres' => 'thres#index'

  # スレ情報(タイトル, NGID, bookmarkなど)
  get    '/api/boards/:board_name/thres/:thre_num' => 'thres#show'

  # レス一覧
  get    '/api/boards/:board_name/thres/:thre_num/resps' => 'resps#index'
  delete '/api/boards/:board_name/thres/:thre_num/resps' => 'resps#delete_all'

  # 特定のレス(150-210など)
  get    '/api/boards/:board_name/thres/:thre_num/resps/:resp_num' => 'resps#show'

  # ブックマーク用
  post   '/api/boards/:board_name/thres/:thre_num/bookmark' => 'bookmarks#new'
  get    '/api/boards/:board_name/thres/:thre_num/bookmark' => 'bookmarks#show'
  delete '/api/boards/:board_name/thres/:thre_num/bookmark' => 'bookmarks#delete'

  # リダイレクト用ページ
  get '/redirect' => 'redirect#index'
end
