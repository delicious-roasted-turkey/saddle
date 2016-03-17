class Reservation < ActiveRecord::Base

  belongs_to :outing, touch: true

  validates :num_adults, numericality: { only_integer: true, greater_than_or_equal_to: 0}
  validates :num_children, numericality: { only_integer: true, greater_than_or_equal_to: 0}

  before_save MoneyFieldCallbacks.new([:price_adult, :price_child])

  # The "natural" (expected) order of reservations is the order in which they
  # were created.
  default_scope { order(:created_at) }

  def total_people
    return num_adults + num_children
  end

end
