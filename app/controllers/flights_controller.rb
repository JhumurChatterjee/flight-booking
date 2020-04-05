class FlightsController < ApiController
  def index
    @flights = Flight.all
    render json: @flights
  end

  def create
    @flight = Flight.create!(flight_params)
    render json: @flights
  end

  def show
    json_response(flight)
  end

  def update
    flight.update(flight_params)
    head :no_content
  end

  def destroy
    flight.destroy
    head :no_content
  end

  private

  def flight_params
    params.require(:flight).permit(:name, :departure_time, :arrival_time, :departure_airport, :arrival_airport, :price, :start_date, :end_date)
  end

  def flight
    @flight ||= Flight.find(params[:id])
  end
end
