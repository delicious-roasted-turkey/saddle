class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :num_adults
      t.integer :num_children
      t.string :skill_level
      t.string :name
      t.string :phone
      t.text :comments
      t.references :outing, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
