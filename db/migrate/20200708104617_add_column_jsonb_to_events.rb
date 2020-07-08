class AddColumnJsonbToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :participants, :jsonb
  end
end
