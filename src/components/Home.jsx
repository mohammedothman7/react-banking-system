import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bankLogo from '../images/bank-resized.png';

class Home extends Component {
  render() {
    return (
      <div>
        <img src={bankLogo} alt='bank' />
        <h1>Bank of React</h1>
        <Link to='login'>Login</Link>
      </div>
    );
  }
}

export default Home;
