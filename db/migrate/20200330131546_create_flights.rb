class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.string  :departure_airport
      t.time    :departure_time
      t.string  :arrival_airport
      t.time    :arrival_time
      t.date    :start_date
      t.date    :end_date
      t.decimal :price

      t.timestamps
    end
  end
end
