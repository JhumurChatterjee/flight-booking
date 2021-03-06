class FlightsController < ApiController
  def index
    @flights = Flight.all
    render json: @flights
  end

  def create
    @flight = Flight.create!(flight_params)
    json_response(@flight, :created)
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
    params.permit(:number, :seats)
  end

  def flight
    @flight ||= Flight.find(params[:id])
  end
end
