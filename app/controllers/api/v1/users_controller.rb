class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :search]
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  
  # curl http://localhost:3000/api/v1/users => ok
    def index 
        users = User.all
    render json:  users.to_json(
        only: [:email]
    )
    end
end
  