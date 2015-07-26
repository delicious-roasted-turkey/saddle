class AddNameToOutings < ActiveRecord::Migration
  def change
    add_column :outings, :name, :string
  end
end
