class DefaultOuting < ActiveRecord::Base

  validates :name, presence: true
  validates :time, presence: true , local_time: true
end
