class AddCommentsToDays < ActiveRecord::Migration
  def change
    add_column :days, :comments, :text
  end
end
