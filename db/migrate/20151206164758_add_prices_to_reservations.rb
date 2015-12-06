class AddPricesToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :price_adult, :decimal, :precision => 16, :scale => 2, :default => 0
    add_column :reservations, :price_child, :decimal, :precision => 16, :scale => 2, :default => 0
  end
end
