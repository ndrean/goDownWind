class EventMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event_mailer.invitation.subject
  #
  def invitation(participant, event)
    @participant = participant
    @event = event
    mail(to: @participant, subject: 'Invitation to a downwind event')
  end
end
