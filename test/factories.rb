FactoryGirl.define do
  sequence :email do |n|
      "person#{n}@example.com"
    end

  factory :user do
    email { generate(:email) }
    password 'password'
  end

  factory :paper do
    name 'paper'
    data []
    requested_reviews 2
    association :submitter, factory: :user
  end

  factory :review do
    paper
    association :reviewer, factory: :user

    trait :finished do
      finished true
    end

    factory :finished_review, traits: [:finished]
  end

  factory :annotation do
    annotation {}
    review
  end

  factory :comment do
    content 'comment'
    annotation
  end
end
