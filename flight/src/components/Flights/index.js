import React from 'react';
import { Link } from 'react-router-dom';
import FlightList from './FlightList';
import axios from 'axios';

export default class Flight extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     flights: null
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

    let flights = [];
    flights = JSON.parse(Flight.all || '[]');
    this.setState({ flights });
  }

  getFlights() {
    axios.get('/api/v1/flights')
    .then(response => {
      this.setState({flights: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getFlights();
  }

  render() {
    const { flights } = this.state;

    if (!flights) {
      return null;
    }

    return (
      <section className='mt-2'>
        <div className='row mb-3'>
          <div className='col-sm-6'>
            <h3>Flight List</h3>
          </div>

          <div className='col-sm-12 col-md-6 text-md-right'>
            <Link className='btn btn-primary' to='/flights/new'>New Flight</Link>
          </div>
        </div>

        <FlightList flights={flights} />
      </section>
    );
  }
}
