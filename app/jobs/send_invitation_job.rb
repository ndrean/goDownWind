class SendInvitationJob < ApplicationJob
  queue_as :default

  def perform(pemail, eventID)
    EventMailer.invitation(pemail, eventID).deliver
  end

end
