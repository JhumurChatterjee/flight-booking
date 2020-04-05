class AddNameToFlights < ActiveRecord::Migration[6.0]
  def change
    add_column :flights, :name, :string, limit: 250
  end
end
