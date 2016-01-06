class AddPricesToDefaultOutings < ActiveRecord::Migration
  def change
    add_column :default_outings, :price_adult, :decimal, :precision => 16, :scale => 2, :default => 0
    add_column :default_outings, :price_child, :decimal, :precision => 16, :scale => 2, :default => 0
  end
end
