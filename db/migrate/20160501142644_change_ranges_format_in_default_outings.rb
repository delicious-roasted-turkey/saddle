class ChangeRangesFormatInDefaultOutings < ActiveRecord::Migration

  def up
    change_column :default_outings, :from, :date
    change_column :default_outings, :to, :date
  end 

  def down
    change_column :default_outings, :from, :datetime
    change_column :default_outings, :to, :datetime
  end 

end
