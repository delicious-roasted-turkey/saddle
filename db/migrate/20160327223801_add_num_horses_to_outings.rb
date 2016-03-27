class AddNumHorsesToOutings < ActiveRecord::Migration
  def change
    add_column :outings, :num_horses, :integer
  end
end
