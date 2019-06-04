json.extract! board, :id, :jname, :ename, :server, :created_at, :updated_at
json.url board_url(board, format: :json)
