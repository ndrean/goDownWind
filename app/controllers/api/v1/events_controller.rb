class Api::V1::EventsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :search]
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events
  # cur http://localhost:3000/api/v1/events => ok
  def index 
    render json:  Event.includes(:user, :itinary).to_json(
      include: [
        user: {only: [:email]},
        itinary: {only: [:date, :start, :end]}
      ]
    )

  #   render json: EventSerializer.new(Event.all, {
  #     include: [:user, :itinary]
  # })#.serialized_json
  end

  
  def show
    render json: @event.to_json(
      include: [
        user: {only: :email},
        itinary: {only: [:date, :start, :end]}
      ]
    )
  end

  
  def new
    @event = Event.new
    @event.build_itinary
    @event.user = current_user
    #@users = User.all
  end


  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)
    @event.user = current_user

    respond_to do |format|
      if @event.save
        # @event.participants.each do |participant|
        #   EventMailer.invitation(participant,@event).deliver_now
        #   # SendInvitationJob.perform_async(
        #   #   params.require(:event).permit(
        #   #     :participant,
        #   #     itinary:[:date, :start, :end])
        #   # )
        # end
        format.json { render json: { status: :ok} }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
    @event.user = current_user
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if authorized? && @event.update(event_params)
        #format.html { redirect_to :root, notice: 'event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        #format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  
  def destroy
    if authorized?
      #@event.itinary.destroy TO CHECK
      @event.destroy
      respond_to do |format|
        format.json  { render json: {status: :ok} }
      end 
    else
      format.json { render json: {errors: @event.errors.full_messages,   status: :unprocessable_entity } } # status: 422
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    def authorized?
      current_user == @event.user
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:user, itinary_attributes: [:date, :start, :end], participants:[])#, user_attributes:[:email, :id])
    end

    def mail_params
      params.require(:event).permit(user:[:email], itinary:[:date, :start,:end])
    end
end
