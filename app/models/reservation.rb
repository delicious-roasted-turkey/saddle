class Reservation < ActiveRecord::Base

  belongs_to :outing

  validates :num_adults, numericality: { only_integer: true, greater_than_or_equal_to: 0}
  validates :num_children, numericality: { only_integer: true, greater_than_or_equal_to: 0}

  before_save MoneyFieldCallbacks.new([:price_adult, :price_child])

end
