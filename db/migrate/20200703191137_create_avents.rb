class CreateAvents < ActiveRecord::Migration[6.0]
  def change
    create_table :avents do |t|

      t.timestamps
    end
  end
end
