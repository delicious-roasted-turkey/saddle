class RemoveConfirmedFromOutings < ActiveRecord::Migration
  def change
    remove_column :outings, :confirmed, :boolean
  end
end
