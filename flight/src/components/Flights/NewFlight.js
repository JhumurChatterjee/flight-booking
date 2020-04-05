import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import TextField from '../shared/TextField';
import SubmitButton from '../shared/SubmitButton';
import SelectField from '../shared/SelectField';
// import validateFlightInput from '../../validators/flightValidator';
import './NewFlight.css';
import DateField from '../shared/DateField';

export default class NewFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    }
  }

  componentDidMount() {
    let authenticity = localStorage.getItem('Authenticity');
    let admin = localStorage.getItem('Admin');

    // if (!authenticity) {
    //   this.props.history.push('/signin');
    //   return;
    // }
    //
    // if(!admin) {
    //   this.props.history.push('/');
    //   return;
    // }

    const airports = JSON.parse(localStorage.getItem('Airports') || '[]');
    const airportOptions = airports.map(airport => {
      return { name: airport.name, value: airport.id };
    });
    this.setState({ airportOptions });
  }

  createFlight = (e) => {
    console.log(e);
    axios.post('/api/v1/flights', {flight: {price: 23}})
    .then(response => {
      const flights = update(this.state.flights, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        flights: flights
      })
    })
    .catch(error => console.log(error))
}

  isValid = () => {
    // // const { errors, isValid } = validateFlightInput(this.state);
    // if (!isValid) this.setState({ errors });
    return true;
  }

  // onSubmit = (e) => {
  //   e.preventDefault();
  //
  //   if (this.isValid()) {
  //     this.setState({ errors: {}, isLoading: true });
  //     this.storeFlightData();
  //     this.props.history.push('/admin/flights');
  //   }
  // }

  storeFlightData = () => {
    const { name, departureAirport, arrivalAirport, arrivalTime, departureTime, startDate, endDate, price } = this.state;
    let flights = JSON.parse(localStorage.getItem('Flights') || '[]');
    let flight = {};

    if (flights.length === 0) {
      flight = { id: 1, name: name, departureAirport: departureAirport, arrivalAirport: arrivalAirport, arrivalTime: arrivalTime, departureTime: departureTime, price: price, startDate: startDate, endDate: endDate };
    } else {
      let lastFlight = flights[flights.length - 1]
      flight = { id: lastFlight.id + 1, name: name, departureAirport: departureAirport, arrivalAirport: arrivalAirport, arrivalTime: arrivalTime, departureTime: departureTime, price: price, startDate: startDate, endDate: endDate }
    }

    flights = [...flights, flight]
    localStorage.setItem('Flights', JSON.stringify(flights))
  }

  render() {
    const { name, arrivalTime, departureTime, price, isLoading, errors, airportOptions, startDate, endDate } = this.state;

    return (
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className='airport-form'>
            <form>
              <h3 className='text-center'>New Flight</h3>


              <TextField

                label='Price'
                value={price}
                fieldName='price'
                type='number'
                autoComplete='off'
                id='flight_price'
              />

              <SubmitButton
                value="Create Flight"
                disabled={isLoading}
                onClick={this.createFlight}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
