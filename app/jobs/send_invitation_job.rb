class SendInvitationJob < ApplicationJob
  queue_as :default

  def perform(participantID, eventID)
    #participant = User.find(participantID)
    #event = Event.find(eventID)
    EventMailer.invitation(participantID, eventID).deliver
  end

end
