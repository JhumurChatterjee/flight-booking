import React from 'react';
import TextField from '../shared/TextField';
import SubmitButton from '../shared/SubmitButton';
import SelectField from '../shared/SelectField';
import axios from 'axios';
import update from 'immutability-helper';

// import validateFlightInput from '../../validators/flightValidator';
import DateField from '../shared/DateField';

export default class EditFlight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      departureTime: '',
      arrivalTime: '',
      startDate: '',
      endDate: '',
      departureAirport: '',
      arrivalAirport: '',
      flightId: null,
      errors: {},
      airportOptions: [],
      isLoading: false,
      flights: [{}]
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    // const { errors, isValid } = validateFlightInput(this.state);
    // if (!isValid) this.setState({ errors });
    return true;
  }

  getFlights() {
    axios.get('/api/v1/flights')
    .then(response => {
      this.setState({flights: response.data})
    })
    .catch(error => console.log(error))
    console.log(this.state);
  }

  onSubmit = (e, id) => {
    e.preventDefault();

    axios.put(`/api/v1/flights/${id}`, {flight: {name: this.state.name, price: this.state.price, departure_time: this.state.departureTime, arrival_time: this.state.arrivalTime, departure_airport: this.state.departureAirport, arrival_airport: this.state.arrivalAirport, start_date: this.state.startDate, end_date: this.state.endDate}})
    .then(response => {
      const todoIndex = this.state.flights.findIndex(x => x.id === response.data.id)
      const flights = update(this.state.flights, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        flights: flights
      })
    })
    .catch(error => console.log(error))
  }

  // updateFlightData = () => {
  //   const { name, departureAirport, arrivalAirport, arrivalTime, departureTime, startDate, endDate, price, flightId } = this.state;
  //   let flights = JSON.parse(localStorage.getItem('Flights') || '[]')
  //   let updatableFlight = flights.find(flight => flight.id === flightId);
  //
  //   if (updatableFlight) {
  //     updatableFlight.name = name;
  //     updatableFlight.departureAirport = departureAirport;
  //     updatableFlight.arrivalAirport = arrivalAirport;
  //     updatableFlight.departureTime = departureTime;
  //     updatableFlight.arrivalTime = arrivalTime;
  //     updatableFlight.startDate = startDate;
  //     updatableFlight.endDate = endDate;
  //     updatableFlight.price = price;
  //   }
  //
  //   flights = flights.map(flight => flight.id === flightId ? updatableFlight : flight);
  //   localStorage.setItem('Flights', JSON.stringify(flights))
  // }

  componentDidMount() {
    this.getFlights()
    const locationState = this.props.location.state;

    if (locationState) {
      let flight = this.state.flights.find(flight => flight.id === locationState.id);

      this.setState({
        name: flight.name,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        startDate: flight.startDate,
        endDate: flight.endDate,
        price: flight.price,
        departureAirport: flight.departureAirport,
        arrivalAirport: flight.arrivalAirport,
        flightId: locationState.id,
        date: flight.date,
        flight: flight
      });
    } else {
      this.props.history.push('/admin/airports'); //please check if logged in or not
    }

    // const airports = JSON.parse(localStorage.getItem('Airports') || '[]');
    // const airportOptions = airports.map(airport => {
    //   return { name: airport.name, value: airport.id };
    // });
    // this.setState({ airportOptions });
  }

  render() {
    const { name, departureAirport, arrivalAirport, arrivalTime, departureTime, price, isLoading, errors, airportOptions, startDate, endDate } = this.state;

    return (
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className='flight-form'>
            <form>
              <h3 className='text-center'>Edit Flight</h3>

              <TextField
                label='Name'
                onChange={this.onChange}
                value={name}
                fieldName='name'
                type='text'
                autoComplete='off'
                id='flight_name'
                autoFocus={true}
              />

              <TextField
                fieldName='departureAirport'
                label='Departure Airport'
                value={departureAirport}
                id='departure_airport'
                onChange={this.onChange}
                type="text"
                autoComplete='off'
              />

              <TextField
                error={errors.departureTime}
                label='Departure Time'
                onChange={this.onChange}
                value={departureTime}
                fieldName='departureTime'
                type='time'
                autoComplete='off'
                id='flight_departure_time'
              />

              <TextField
                fieldName='arrivalAirport'
                value={arrivalAirport}
                label='Arrival Airport'
                id='arrival_airport'
                onChange={this.onChange}
                type='text'
                autoComplete='off'
              />

              <TextField
                label='Arrival Time'
                onChange={this.onChange}
                value={arrivalTime}
                fieldName='arrivalTime'
                type='time'
                autoComplete='off'
                id='flight_arrival_time'
              />

              <DateField
                label='Start Date'
                onChange={this.onChange}
                value={startDate}
                fieldName='startDate'
                type='date'
                autoComplete='off'
                id='flight_start_date'
              />

              <DateField
                label='End Date'
                onChange={this.onChange}
                value={endDate}
                fieldName='endDate'
                type='date'
                autoComplete='off'
                id='flight_end_date'
              />

              <TextField
                error={errors.prie}
                label='Price'
                onChange={this.onChange}
                value={price}
                fieldName='price'
                type='number'
                autoComplete='off'
                id='flight_price'
              />

              <SubmitButton
                value="Update Flight"
                disabled={isLoading}
                onClick={(e) => { this.onSubmit(e, this.state.flightId)}}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
