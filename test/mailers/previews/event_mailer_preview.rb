# Preview all emails at http://localhost:3000/rails/mailers/event_mailer
class EventMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/event_mailer/invitation
  def invitation
    @participant = User.first.email
    @event = Event.first
    EventMailer.invitation(@participant,@event)
  end

end
