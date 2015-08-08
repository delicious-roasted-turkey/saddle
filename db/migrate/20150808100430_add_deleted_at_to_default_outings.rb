class AddDeletedAtToDefaultOutings < ActiveRecord::Migration
  def change
    add_column :default_outings, :deleted_at, :datetime
    add_index :default_outings, :deleted_at
  end
end
