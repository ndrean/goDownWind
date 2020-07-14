class EventMailer < ApplicationMailer

  CONTACT_EMAIL = "nevendrean@yahoo.fr"

  def welcome(user)
    @user = user
    mail(to: @user.email, subject: "Welcome to GoDownWind.online")
  end

  def invitation(participant, event)
    #@participant = User.find(participant)
    #@event = Event.find(event)
    @participant = participant
    @event = event

    #mail(to: "CONTACT_EMAIL", subject: `Invitation to a downwind event`)
    mail(to: 'nevendrean@yahoo.fr', subject: "Invitation to a downwind event")
  end

end
