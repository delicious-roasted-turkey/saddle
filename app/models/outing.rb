class Outing < ActiveRecord::Base

  belongs_to :day
  has_many :reservations
  belongs_to :default_outing

  validates :time, presence: true , local_time: true
  validates :day, presence: true

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

  after_initialize :set_default_vals

  def self.by_default_outing_params def_out
    {
      :name => def_out.name,
      :time => def_out.time,
      :default_outing_id => def_out.id
    }
  end

  def confirmed?
    persisted?
  end

  # Creates a confirmed outing and its day if needed
  def self.create_confirmed(outing_params, date)
    outing = Outing.new outing_params
    outing.day = Day.by_date date
    outing.save!
  end

  # Creates a confirmed outing with data from a default
  # outing
  def self.create_from_default(default_outing, date)
    params = Outing.by_default_outing_params default_outing
    Outing.create_confirmed params, date
  end

  private

  def set_default_vals
    self.name = '' if self.name.nil?
  end

end
