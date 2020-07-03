class RemoveOwnerFromEvents < ActiveRecord::Migration[6.0]
  def change
    remove_column :events, :owner_id, :string
  end
end
