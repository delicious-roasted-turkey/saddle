class AddDefaultOutingToOuting < ActiveRecord::Migration
  def change
    add_reference :outings, :default_outing, index: true, foreign_key: true
  end
end
