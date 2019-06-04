class GenresController < ApplicationController
  def index
    genre_boards = []

    genres = Genre.order(:id).map do |genre|
      {
        genre: genre.name,
        boards: genre.boards.map { |board|
          {
            ename: board.ename,
            jname: board.jname,
            server: board.server,
          }
        }
      }
    end
    render json: genres
  end


  def update
    Genre.update_genres
    render json: { result: 'OK' }
  end
end
