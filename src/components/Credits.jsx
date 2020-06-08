import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AccountBalance from './AccountBalance';

class Credits extends Component {
  state = {
    transactionDescription: '',
    transactionAmount: '',
    credits: this.props.credits,
    creditBalance: this.props.creditBalance,
    accountBalance: this.props.accountBalance,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let amount = parseFloat(this.state.transactionAmount);
    amount = amount.toFixed(2);
    let credits = this.props.credits.push({
      amount,
      description: this.state.transactionDescription,
      date: Date.now(),
      id: uuidv4(),
    });

    console.log('amount:', amount);
    let creditBalance = parseFloat(this.state.creditBalance) + amount;
    console.log('creditBalance:', typeof creditBalance);
    this.setState({ credits });

    this.props.handleAddCredits(amount);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Link to='/userprofile'>Profile</Link>
        <h1>Credit Transaction History</h1>
        <AccountBalance
          accountBalance={this.props.creditBalance - this.props.debitBalance}
        />

        <div className='AddcreditTransaction'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='transactionDescription'
              placeholder='Transaction Description'
              value={this.state.transactionDescription}
              onChange={this.handleChange}
              required={true}
            ></input>
            <input
              type='text'
              name='transactionAmount'
              placeholder='Transaction Amount'
              value={this.state.transactionAmount}
              onChange={this.handleChange}
              required={true}
            ></input>
            <button name='AddcreditButton'>Add credit</button>
          </form>
        </div>

        <div className='showcreditHistory'>
          {this.props.credits.map((e) => {
            return (
              <div key={uuidv4()}>
                <h3>
                  {e.description.toUpperCase()}{' '}
                  <div style={amountStyle}>${e.amount}</div>
                </h3>
                <p>Date: {e.date}</p>
                <p>ID: {e.id}</p>
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const amountStyle = {
  color: 'red',
  display: 'inline',
  fontWeight: 'bold',
};

export default Credits;
