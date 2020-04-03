import React from 'react';
import Flight from './Flight';

export default class FlightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: null,
      airports: null
    }
  }

  componentDidMount() {
    const flights = JSON.parse(localStorage.getItem('Flights') || '[]');
    const airports = JSON.parse(localStorage.getItem('Airports') || '[]');
    this.setState({ flights, airports });
  }

  findAirportName = (id) => {
    const { airports } = this.state;
    const airport = airports.find(airport => airport.id.toString() === id);
    return airport.name;
  }

  render() {
    if(this.state.airports === null) return null;

    return(
      <div className='row'>
        { this.props.flights.map((flight, index) => {
          return(
            <div className='col-sm-3' key={index}>
              <Flight flight={flight} departureAirport={this.findAirportName(flight.departureAirport)} arrivalAirport={this.findAirportName(flight.arrivalAirport)} />
            </div>
          )})}
      </div>
    );
  }
}
