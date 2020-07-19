ActionMailer::Base.smtp_settings = {
  address: "smtp.mailgun.org",
  port: 587,
  domain: 'gmail.com',
  user_name: ENV['MAIL_ADDRESS'],
  password: ENV['MAIL_APP_PASSWORD'],
  authentication: :login,
  enable_starttls_auto: true
}