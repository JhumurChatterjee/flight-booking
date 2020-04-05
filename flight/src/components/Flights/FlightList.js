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

  render() {
    if(this.state.airports === null) return null;

    return(
      <div className='row'>
        { this.props.flights.map((flight, index) => {
          return(
            <div className='col-sm-3' key={index}>
              <Flight flight={flight} />
            </div>
          )})}
      </div>
    );
  }
}
