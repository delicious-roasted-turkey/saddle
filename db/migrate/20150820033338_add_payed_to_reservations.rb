class AddPayedToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :payed, :boolean, :default => false
  end
end
