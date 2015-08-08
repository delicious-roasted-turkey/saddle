class DefaultOuting < ActiveRecord::Base

  acts_as_paranoid
  
  validates :name, presence: true
  validates :time, presence: true , local_time: true

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

end

