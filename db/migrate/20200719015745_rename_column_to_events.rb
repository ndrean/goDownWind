class RenameColumnToEvents < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :directCLAlt, :publicID
  end
end
