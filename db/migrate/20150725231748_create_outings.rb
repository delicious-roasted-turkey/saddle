class CreateOutings < ActiveRecord::Migration
  def change
    create_table :outings do |t|
      t.string :time
      t.references :day, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
