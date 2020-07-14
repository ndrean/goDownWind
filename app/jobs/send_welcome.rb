class SendWelcomeJob < ApplicationJob
  queue_as :default

  def perform(user)
    #participant = User.find(participantID)
    #event = Event.find(eventID)
    @user = user
    EventMailer.welcome(@user).deliver
  end

end
