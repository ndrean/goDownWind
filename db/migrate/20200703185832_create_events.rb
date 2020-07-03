class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.references :itinary, null: false, foreign_key: true
      t.string :participants, array: true
      t.timestamps
    end
    add_index :events, :participants, using: 'gin'
  end
end
