require 'money/money_field_callbacks'

class Outing < ActiveRecord::Base

  belongs_to :day, touch: true
  has_many :reservations
  belongs_to :default_outing

  validates :time, presence: true , local_time: true
  validates :day, presence: true

  before_save MoneyFieldCallbacks.new([:price_adult, :price_child])

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

  after_initialize :set_default_vals

  def self.by_default_outing_params def_out
    {
      :name => def_out.name,
      :time => def_out.time,
      :price_adult => def_out.price_adult,
      :price_child => def_out.price_child,
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

  def free_places
    num_available_horses - taken_places
  end

  def taken_places
    sum = 0
    reservations.each do |rv|
      sum += rv.num_adults
      sum += rv.num_children
    end
    sum
  end

  def num_available_horses
    date = day.date.clone
    Outing.num_available_horses date, self[:time]
  end

  def self.num_available_horses (date, time)
    hours = Integer time[0,2], 10
    minutes = Integer time[3,2], 10
    datetime = DateTime.new(date.year, date.month, date.day, hours, minutes)
    AvailableHorseCount.count_at_date datetime
  end

  private

  def set_default_vals
    self.name = '' if self.name.nil?
  end

end
