class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.date :date

      t.timestamps null: false
    end
    add_index :days, :date, unique: true
  end
end
