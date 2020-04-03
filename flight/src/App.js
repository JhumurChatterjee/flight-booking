import React from 'react';
// import Navbar from './Navbar';
import routes from '../routes';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className='container'>
          {routes}
        </div>
      </>
    );
  }
}

export default App;
