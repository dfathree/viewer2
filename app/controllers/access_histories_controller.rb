class AccessHistoriesController < ApplicationController
  before_action :set_access_history, only: [:show, :edit, :update, :destroy]

  # GET /access_histories
  # GET /access_histories.json
  def index
    @access_histories = AccessHistory.all
  end

  # GET /access_histories/1
  # GET /access_histories/1.json
  def show
  end

  # GET /access_histories/new
  def new
    @access_history = AccessHistory.new
  end

  # GET /access_histories/1/edit
  def edit
  end

  # POST /access_histories
  # POST /access_histories.json
  def create
    @access_history = AccessHistory.new(access_history_params)

    respond_to do |format|
      if @access_history.save
        format.html { redirect_to @access_history, notice: 'Access history was successfully created.' }
        format.json { render :show, status: :created, location: @access_history }
      else
        format.html { render :new }
        format.json { render json: @access_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /access_histories/1
  # PATCH/PUT /access_histories/1.json
  def update
    respond_to do |format|
      if @access_history.update(access_history_params)
        format.html { redirect_to @access_history, notice: 'Access history was successfully updated.' }
        format.json { render :show, status: :ok, location: @access_history }
      else
        format.html { render :edit }
        format.json { render json: @access_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /access_histories/1
  # DELETE /access_histories/1.json
  def destroy
    @access_history.destroy
    respond_to do |format|
      format.html { redirect_to access_histories_url, notice: 'Access history was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_access_history
      @access_history = AccessHistory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def access_history_params
      params.require(:access_history).permit(:board_id, :thre_id)
    end
end
