import React from 'react';
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
      name: '',
      price: '',
      departureTime: '',
      arrivalTime: '',
      departureAirport: null,
      arrivalAirport: null,
      errors: {},
      startDate: '',
      endDate: '',
      airportOptions: [],
      isLoading: false
    }
  }

  componentDidMount() {
    let authenticity = localStorage.getItem('Authenticity');
    let admin = localStorage.getItem('Admin');

    if (!authenticity) {
      this.props.history.push('/signin');
      return;
    }

    if(!admin) {
      this.props.history.push('/');
      return;
    }

    const airports = JSON.parse(localStorage.getItem('Airports') || '[]');
    const airportOptions = airports.map(airport => {
      return { name: airport.name, value: airport.id };
    });
    this.setState({ airportOptions });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const { errors, isValid } = validateFlightInput(this.state);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.storeFlightData();
      this.props.history.push('/admin/flights');
    }
  }

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
                error={errors.name}
                label='Name'
                onChange={this.onChange}
                value={name}
                fieldName='name'
                type='text'
                autoComplete='off'
                id='flight_name'
                autoFocus={true}
              />

              <SelectField
                error={errors.departureAirport}
                fieldName='departureAirport'
                label='Departure Airport'
                id='departure_airport'
                onChange={this.onChange}
                options={airportOptions}
                prompt='-- Select Airport --'
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

              <SelectField
                error={errors.arrivalAirport}
                fieldName='arrivalAirport'
                label='Arrival Airport'
                id='arrival_airport'
                onChange={this.onChange}
                options={airportOptions}
                prompt='-- Select Airport --'
              />

              <TextField
                error={errors.arrivalTime}
                label='Arrival Time'
                onChange={this.onChange}
                value={arrivalTime}
                fieldName='arrivalTime'
                type='time'
                autoComplete='off'
                id='flight_arrival_time'
              />

              <DateField
                error={errors.startDate}
                label='Start Date'
                onChange={this.onChange}
                value={startDate}
                fieldName='startDate'
                type='date'
                autoComplete='off'
                id='flight_start_date'
              />

              <DateField
                error={errors.endDate}
                label='End Date'
                onChange={this.onChange}
                value={endDate}
                fieldName='endDate'
                type='date'
                autoComplete='off'
                id='flight_end_date'
              />

              <TextField
                error={errors.price}
                label='Price'
                onChange={this.onChange}
                value={price}
                fieldName='price'
                type='number'
                autoComplete='off'
                id='flight_price'
              />

              <SubmitButton
                value="Create Flight"
                disabled={isLoading}
                onClick={this.onSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
