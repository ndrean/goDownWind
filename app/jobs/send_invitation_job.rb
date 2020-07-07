class SendInvitationJob < ApplicationJob
  queue_as :default

  def perform(participant, event)
    EventMailer.invitation(participant, event).deliver
  end

end
