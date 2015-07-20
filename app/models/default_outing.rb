class DefaultOuting < ActiveRecord::Base

  validates :name, presence: true
  validates :time, presence: true , local_time: true

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

end

