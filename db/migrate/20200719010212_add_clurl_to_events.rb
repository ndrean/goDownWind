class AddClurlToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :directCLUrl, :string
    add_column :events, :directCLAlt, :string
  end
end
