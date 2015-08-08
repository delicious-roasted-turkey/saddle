class CreateDismissedDefaultOutings < ActiveRecord::Migration
  def change
    create_table :dismissed_default_outings do |t|
      t.belongs_to :day, index: true
      t.belongs_to :default_outing, index: true
    end
  end
end
