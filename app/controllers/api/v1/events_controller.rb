class Api::V1::EventsController < ApplicationController
  #skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!, only: [:index, :search]
  #before_action :authenticate_user!
  #before_action :set_event, only: [:show, :update, :destroy]

  # curl http://localhost:3000/api/v1/events => ok
  def index 
    render json:  Event.includes(:user, :itinary).to_json(
      include: [
        user: {only: [:email]},
        itinary: {only: [:date, :start, :end]}
      ]
    )

  end

  #api/v1/events/:id => ok
  def show
    @event = Event.find(params[:id])
    render json: @event.to_json(
      include: [
        user: {only: :email},
        itinary: {only: [:date, :start, :end]},
      ]
    )
  end

  # POST
  def create
    @event = Event.new(event_params)
    @event.user = current_user
    if @event.photo.attached?
      @event.url = @event.photo.service_url
    end
    #respond_to do |format|
      if @event.save
        if @event.participants
          # @event.participants.each do |participant|
          #   EventMailer.invitation(participant[:email],@event).deliver_now 
          # # SendInvitationJob.perform_later(
          # #   params.permit(:participantID, :eventID) 
          # end
        end
        logger.debug "..............#{@event.to_json}"
        #format.json { render json: { status: :created} }
        render json: { status: :created }
      else
        #format.json { render json: @event.errors.full_messages, status: :unprocessable_entity }
        render json:  @event.errors.full_messages, status: :unprocessable_entity 
      end
    #end
  end

  # PATCH/PUT /events/:id
  def update
    @event = Event.find(params[:id])
    
    if event_params[:photo] || @event.url
      logger.debug "..................BEFORE : ..#{@event.to_json}"
      @event.photo.purge
      @event.url = nil
      ActiveStorage::Blob.create_and_upload!(
          io: File.open(event_params[:photo].tempfile),
          filename: event_params[:photo].original_filename,
          content_type:event_params[:photo].content_type
        ) 
    end
    
    if @event.update(event_params)
      if event_params[:photo]
        logger.debug "...............#{@event.photo.attached?}" 
        @event.url = @event.photo.service_url
      end
      logger.debug "................AFTER :.. #{@event.to_json}"
      render json: {status: :ok}
    else
      render json: {errors: @event.errors.full_messages},
        status: :unprocessable_entity, notice:"not authorized"
    end
    
  end

  
  def destroy
    @event = Event.find(params[:id])
    if authorized?
      @event.itinary.destroy
      if @event.photo.attached? 
        @event.photo.purge_later
      end
      @event.destroy
      respond_to do |format|
        format.json  { render json: {status: :ok} }
      end 
    else
      format.json { render json: {errors: @event.errors.full_messages,   status: :unprocessable_entity } } # status: 422
    end
  end


  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      #logger.debug "................#{params.require(:event).fetch(:participants,[]).map(&:keys.to_sym).flatten.uniq}"
      params.require(:event).permit( :user, :photo,  itinary_attributes: [:date, :start, :end], participants: [:email, :notif, :id]) #:participants => sp_keys)#, [:email, :id])
    end

    def authorized?
      current_user == @event.user
    end


    def handle_unauthorized
      unless authorized?
        respond_to do |format|
          format.json { render :unauthorized, status: 401 }
        end
      end
    end


    def mail_params
      params.require(:event).permit(user:[:email], itinary:[:date, :start,:end])
    end
end
