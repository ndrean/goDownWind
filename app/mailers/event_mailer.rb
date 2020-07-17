class EventMailer < ApplicationMailer

  #CONTACT_EMAIL = "nevendrean@yahoo.fr"

  # def welcome(user)
  #   @user = user
  #   mail(to: @user.email, subject: "Welcome to GoDownWind.online")
  # end


  def invitation(p_email, event_ID)
    @p_email = p_email
    @event = Event.find(event_ID)
    return if @event.nil? || p_email.nil?
    mail(to: @p_email,  subject: "Invitation to a downwind event")
  end

end
