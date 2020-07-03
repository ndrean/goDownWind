class Owner::EventsController < ApplicationController

    def index
        @events = Event.where(owner_id: current_user.id)
    end

    def new
        @event = Event.new
    end

    def create
        @event = Event.new(event_params)
        @event.owner = current_user
        redirect_to owner_events_path
    end
end