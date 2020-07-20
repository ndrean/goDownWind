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
      render json: { status: 201 }
    else
      render json: event.errors.full_messages, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /events/:id
  def update
    event = Event.find(params[:id])
    if event.user != current_user
      return render json: {status: 401}
    end

    # async purge only for Active Storage since direct upload data is in params
    if event_params[:photo] && event.url
      logger.debug "...............#{event.photo.key}"
      PurgeCl.perform_later(event.photo.key)
      event.photo.purge_later
    end

    # if we update direct link, then first remove from CL if one exists
    logger.debug "................#{event_params[:directCLUrl] && event.directCLUrl}"
    if event_params[:directCLUrl] && event.directCLUrl
        RemoveDirectLink.perform_later(event.publicID)
    end

    if event.update(event_params)
      # if a new picture is saved to Active Storage, update link
      # if a direct link to CL is done, the links will be in the params
      if event_params[:photo]
        event.update(url: event.photo.url)
      end
      
      render json: { status: 200 }
    else
      render json: {errors: event.errors.full_messages},
        status: :unprocessable_entity
    end
  end

  
  def destroy
    event = Event.find(params[:id])   
    
    if event.user != current_user
      return render json: { status: 401 }
    end

    # async Active_Job
      if event.photo.attached?
        logger.debug "................#{event.photo.key}"
        PurgeCl.perform_later(event.photo.key)
        event.photo.purge_later
      end

    #async Active_Job
      if event.publicID
        RemoveDirectLink.perform_later(event.publicID)
      #   Cloudinary::Uploader.destroy(event.publicID)
      end

      event.itinary.destroy
      event.destroy
      render json: {status: 200}
  end

  def search
  end

  private
    def event_params
      #logger.debug "................#{params.require(:event).fetch(:participants,[]).map(&:keys.to_sym).flatten.uniq}"
      params.require(:event).permit( :user, :photo, :directCLUrl, :publicID,  itinary_attributes: [:date, :start, :end], participants: [:email, :notif, :id]) #:participants => sp_keys)#, [:email, :id])
    end

    def handle_unauthorized(current, user)
      unless current == user
        render :unauthorized, status: 401
      end
    end

    # def mail_params
    #   params.require(:event).permit(user:[:email], itinary:[:date, :start,:end])
    # end
end
