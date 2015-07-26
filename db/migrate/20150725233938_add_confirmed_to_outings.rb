class AddConfirmedToOutings < ActiveRecord::Migration
  def change
    add_column :outings, :confirmed, :boolean
  end
end
