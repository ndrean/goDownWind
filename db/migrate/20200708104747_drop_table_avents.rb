class DropTableAvents < ActiveRecord::Migration[6.0]
  def change
    drop_table :avents
  end
end
