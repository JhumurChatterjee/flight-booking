class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.string  :number
      t.integer :seats

      t.timestamps
    end
  end
end
