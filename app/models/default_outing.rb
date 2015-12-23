require 'money/money_field_callbacks'

class DefaultOuting < ActiveRecord::Base

  acts_as_paranoid

  validates :name, presence: true
  validates :time, presence: true , local_time: true

  before_save MoneyFieldCallbacks.new([:price_adult, :price_child])

  # Outings are returned in ascending time by default
  default_scope { order(:time) }

end

