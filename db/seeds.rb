
#puts MTG::Set.generate_booster('ktk')

puts "Seeding Users"
3.times do
    User.create(username: Faker::Cosmere.herald, password_digest: Faker::Cosmere.knight_radiant, bio: Faker::Quote.most_interesting_man_in_the_world)
end

puts "Seeding Collections"
Collection.create(user_id: 1, title: "Prog")
Collection.create(user_id: 1, title: "Eternal")
Collection.create(user_id: 2, title: "Chaff")
puts "Seeding Cards"
40.times do
Card.create(user_id: 1, collection_id: 1, info: Faker::Games::Pokemon.name)
end
30.times do
Card.create(user_id: 1, collection_id: 2, info: Faker::Games::Pokemon.name)
end
30.times do
Card.create(user_id: 2, collection_id: 3, info: Faker::Games::Pokemon.name)
end

puts "Seeding Decks"
Deck.create(user_id: 2, name: "Sidewalk slam", format: "Freeform", description: "Everything is 1 cent")
























puts "Done!"
