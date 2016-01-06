FactoryGirl.define do

  factory :user do
    email 'johndoe@example.com'
    password '00000000'
  end

  factory :day do
    date '2015-02-03'
  end

  factory :outing do
    day
    time '09:00'
  end

  factory :reservation do
    outing
    num_adults 2
    num_children 1
  end

end

