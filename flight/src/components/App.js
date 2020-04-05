import React from 'react';
// import Navbar from './Navbar';
import routes from './../routes';
import axios from 'axios';
import update from 'immutability-helper';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  getTodos() {
    axios.get('/api/v1/flights')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTodos()
  }

  render() {
    return (
      <>
        <div className='container'>
          {routes}
        </div>
      </>
    );
  }
}

export default App;
