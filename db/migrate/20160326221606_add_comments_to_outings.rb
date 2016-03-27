class AddCommentsToOutings < ActiveRecord::Migration
  def change
    add_column :outings, :comments, :text
  end
end
