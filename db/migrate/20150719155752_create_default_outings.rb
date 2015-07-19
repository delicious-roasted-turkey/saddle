class CreateDefaultOutings < ActiveRecord::Migration
  def change
    create_table :default_outings do |t|
      t.string :name
      t.string :time

      t.timestamps null: false
    end
  end
end
