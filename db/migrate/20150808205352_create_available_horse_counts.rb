class CreateAvailableHorseCounts < ActiveRecord::Migration
  def change
    create_table :available_horse_counts do |t|
      t.integer :num_horses
      t.datetime :from

      t.timestamps null: false
    end
  end
end
