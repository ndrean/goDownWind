# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'Cleaning...'
Event.destroy_all
Itinary.destroy_all
User.destroy_all

puts 'Creating...'
10.times do
    User.create!(email: Faker::Internet.email, password: Faker::Code.npi, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
    Itinary.create!(start: Faker::Address.city, end:Faker::Address.city, date: Faker::Date.between(from: Date.today, to: '2020-09-01') )
end

a = User.first.id
b = User.last.id
kiters = []
Array(a..b).each { |i| kiters << User.find(i).email}
puts kiters
c= Itinary.first.id
d=Itinary.last.id
arr_i = Array(c..d)

Array(a..b).each do |idx|
    participants = []
    kiters.each { |k| participants << {email: k, notif: false}}
    Event.create!(user: User.find(idx), itinary: Itinary.find(arr_i.sample), participants: participants)
end

