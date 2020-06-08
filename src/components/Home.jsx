import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <img src='../images/bank.png' alt='bank' />
        <h1>Bank of React</h1>
        <Link to='login'>Login</Link>
      </div>
    );
  }
}

export default Home;
