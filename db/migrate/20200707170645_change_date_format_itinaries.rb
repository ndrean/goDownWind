class ChangeDateFormatItinaries < ActiveRecord::Migration[6.0]
  def change
    change_column :itinaries, :date, :date
  end
end
