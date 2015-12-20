class DefaultOuting < ActiveRecord::Base

  acts_as_paranoid

  validates :name, presence: true
  validates :time, presence: true , local_time: true

  before_save do
    puts '#######################'
    puts '#######################'
    puts 'saving a default Outing'
    puts self.class
    puts self.price_adult.class
    puts self.price_child.class
    puts '#######################'
    puts '#######################'
  end

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

end

