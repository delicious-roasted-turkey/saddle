class AddRangesToDefaultOutings < ActiveRecord::Migration
  def change
    add_column :default_outings, :from, :datetime
    add_column :default_outings, :to, :datetime
  end
end
