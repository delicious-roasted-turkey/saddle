class Outing < ActiveRecord::Base

  belongs_to :day
  has_many :reservations

  validates :time, presence: true , local_time: true
  validates :day, presence: true

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

  after_initialize :set_default_vals

  # Confirms an outing
  def confirm!
    self.confirmed = true
    save!
  end

  # Creates a confirmed outing and its day if needed
  def self.create_confirmed(outing_params, date)
    outing = Outing.new outing_params
    outing.day = Day.by_date date
    outing.confirmed = true
    outing.save!
  end

  private

  def set_default_vals
    self.name = '' if self.name.nil?
    self.confirmed = false if self.confirmed.nil?
  end

end
