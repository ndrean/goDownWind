class EventsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :search]
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events
  # GET /events.json
  def index
    @events = Event.includes(:user, :itinary)
    
  end

  
  # def show
  # end

  
  def new
    @event = Event.new
    @event.build_itinary
    @event.user = current_user
    #buid variable @users as the collection of emails for the form
    @users = []
    User.all.each { |u| @users << u.email}
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
    @event.user = current_user
  end

  # POST /events
  # POST /events.json
  def create
    participants = event_params[:participants]
    if participants
      participants.shift
    end
    @event = Event.new(event_params)
    @event.participants = participants
    @event.user = current_user

    respond_to do |format|
      if @event.save
        
        @event.participants.each do |participant|
          EventMailer.invitation(participant,@event).deliver_now
        end
        format.html { redirect_to :root, notice: 'event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to :root, notice: 'event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    if current_user == @event.user
      @event.itinary.destroy
      @event.destroy
    end
    respond_to do |format|
      #format.js
      format.html { redirect_to events_url, notice: 'event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def hello
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:user, itinary_attributes: [:date, :start, :end], participants:[])#, user_attributes:[:email, :id])
    end
end
