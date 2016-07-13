# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Question.create([
  { text: 'Grammatical Correctness', question_type: :rating, steps: 5 },
  { text: 'Legitimacy of References', question_type: :rating, steps: 5 },
  { text: 'Usefulness of research', question_type: :rating, steps: 5 },
  { text: 'Quality of methods', question_type: :rating, steps: 5 },
  { text: 'Likeliness to get accepted', question_type: :rating, steps: 5 },

  { text: 'Usefulness of research', question_type: :question },
  { text: 'Quality of methods', question_type: :question },
  { text: 'Likeliness to get accepted', question_type: :question }
])
