class AddIndexToAvailableHorseCountDate < ActiveRecord::Migration
  def change
    add_index :available_horse_counts, :from
  end
end
