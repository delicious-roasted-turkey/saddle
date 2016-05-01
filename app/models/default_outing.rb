require 'money/money_field_callbacks'

class DefaultOuting < ActiveRecord::Base

  after_create :uncache_days
  after_update :uncache_days
  after_destroy :uncache_days

  acts_as_paranoid

  validates :name, presence: true
  validates :time, presence: true , local_time: true

  before_save MoneyFieldCallbacks.new([:price_adult, :price_child])

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

  def uncache_days
    Day.clear_full_cache
  end

  # Receives a date (local date) and returns whether the date range
  # in wich this default outing is defined contains the given date.
  def range_contains (date)
    return (
      (self.from.nil? or (self.from <= date)) and
      (self.to.nil? or (self.to >= date))
    )
  end

end

