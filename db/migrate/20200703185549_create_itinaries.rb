class CreateItinaries < ActiveRecord::Migration[6.0]
  def change
    create_table :itinaries do |t|
      t.datetime :date
      t.string :start
      t.string :end
      t.string :picture

      t.timestamps
    end
  end
end
