import React from 'react';
import { Link } from 'react-router-dom';

export default class Flight extends React.Component {
  render() {
    const { flight } = this.props;

    return(
      <div className='card mb-4'>
        <div className='card-body'>
          <h5 className='card-title'><strong>Name: </strong>{flight.name}</h5>
          <p className='card-text'><strong>Departure Airport: </strong>{this.props.departureAirport}</p>
          <p className='card-text'><strong>Arrival Airport: </strong>{this.props.arrivalAirport}</p>
          <p className='card-text'><strong>Departure Time: </strong>{flight.departureTime}</p>
          <p className='card-text'><strong>Arrival Time: </strong>{flight.arrivalTime}</p>
          <p className='card-text'><strong>Start Date: </strong>{flight.startDate}</p>
          <p className='card-text'><strong>End Date: </strong>{flight.endDate}</p>
          <p className='card-text'><strong>Price: </strong>{flight.price}</p>
          <Link className='btn btn-primary btn-sm' to={{ pathname: `/flights/edit/${flight.id}`, state: { id: flight.id }}}>Edit</Link>
        </div>
      </div>
    );
  }
}
