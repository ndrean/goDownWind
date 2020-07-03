class AventsController < ApplicationController
  before_action :set_avent, only: [:show, :edit, :update, :destroy]

  # GET /avents
  # GET /avents.json
  def index
    @avents = Avent.all
  end

  # GET /avents/1
  # GET /avents/1.json
  def show
  end

  # GET /avents/new
  def new
    @avent = Avent.new
  end

  # GET /avents/1/edit
  def edit
  end

  # POST /avents
  # POST /avents.json
  def create
    @avent = Avent.new(avent_params)

    respond_to do |format|
      if @avent.save
        format.html { redirect_to @avent, notice: 'Avent was successfully created.' }
        format.json { render :show, status: :created, location: @avent }
      else
        format.html { render :new }
        format.json { render json: @avent.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /avents/1
  # PATCH/PUT /avents/1.json
  def update
    respond_to do |format|
      if @avent.update(avent_params)
        format.html { redirect_to @avent, notice: 'Avent was successfully updated.' }
        format.json { render :show, status: :ok, location: @avent }
      else
        format.html { render :edit }
        format.json { render json: @avent.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /avents/1
  # DELETE /avents/1.json
  def destroy
    @avent.destroy
    respond_to do |format|
      format.html { redirect_to avents_url, notice: 'Avent was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_avent
      @avent = Avent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def avent_params
      params.fetch(:avent, {})
    end
end
