class FlightSerializer < ActiveModel::Serializer
  attributes *Flight.column_names
end
