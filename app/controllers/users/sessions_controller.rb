# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  #before_action :configure_sign_in_params, only: [:create]
  respond_to  :js

  # GET /resource/sign_in
  # def new
  #   super
  #   respond_to :js
  # end

  # #POST /resource/sign_in
  # def create
  #   super
  #   resource = User.find_for_database_authentication(email: params[:user][:email])
  #   return invalid_login_attempt unless resource

  #   if resource.valid_password?(params[:user][:password])
  #     sign_in :user, resource
  #     return render nothing: true
  #   end

  #   invalid_login_attempt
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
