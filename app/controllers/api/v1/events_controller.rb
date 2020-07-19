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
    event = Event.find(params[:id])
    render json: event.to_json(
      include: [
        user: {only: :email},
        itinary: {only: [:date, :start, :end]},
      ]
    )
  end

  # POST
  def create
    event = Event.new(event_params)
    event.user = current_user
    # get the Cloudinary url if a photo is passed in the form
    if event.photo.attached?
      event.url = event.photo.url
    end

    if event.save
      # if any participant passed in the form, send async email
      if event.participants
        event.participants.each do |participant|
          # event.participant=[{email:xx,notif:xx},..] , 'jsonb' format => participant['email']
          EventMailer.invitation(participant['email'], event.id)
            .deliver_later
        end
      end
      logger.debug "..............#{event.user}"
      render json: event, status: :created
    else
      render json: event.errors.full_messages, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /events/:id
  def update
    event = Event.find(params[:id])
    render json: {status: 401} if event.user != current_user
    
    if event_params[:photo] && event.url
      event.photo.purge_later
    end
    if event.update(event_params)
      if event_params[:photo]
        event.update(url: event.photo.url)
      end
      render json: event, status: :ok
    else
      render json: {errors: event.errors.full_messages},
        status: :unprocessable_entity, notice:"not authorized"
    end
  end

  
  def destroy
    event = Event.find(params[:id])
    render json: {status: 401} if event.user != current_user

    # async Active_Job
    
      if event.photo.attached?
        PurgeCl.perform_later(event.photo.key)
        event.photo.purge_later
      end
      #   result = Cloudinary::Search
      #     .expression(filename=event.photo.key)
      #     .execute
      #   if result.any?
      #       Cloudinary::Uploader.destroy(result['resources'][0]['public_id'])
      #   end
      #   event.photo.purge_later
      # end
    #async Active_Job
    
      if event.publicID
        RemoveDirectLink.perform_later(event.publicID)
      #   Cloudinary::Uploader.destroy(event.publicID)
      end

      event.itinary.destroy
      event.destroy
      render json: {status: :ok}
  end

  def search
  end

  private
    def event_params
      #logger.debug "................#{params.require(:event).fetch(:participants,[]).map(&:keys.to_sym).flatten.uniq}"
      params.require(:event).permit( :user, :photo, :directCLUrl, :publicID,  itinary_attributes: [:date, :start, :end], participants: [:email, :notif, :id]) #:participants => sp_keys)#, [:email, :id])
    end

    def authorized?(event)
      current_user == event.user
    end


    def handle_unauthorized
      unless authorized?
        render :unauthorized, status: 401
      end
    end


    def mail_params
      params.require(:event).permit(user:[:email], itinary:[:date, :start,:end])
    end
end
