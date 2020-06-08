import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  state = {
    transactionDescription: '',
    transactionAmount: '',
    debits: this.props.debits,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let amount = parseFloat(this.state.transactionAmount);
    amount = amount.toFixed(2);
    let debits = this.props.debits.push({
      amount,
      description: this.state.transactionDescription,
      date: Date.now(),
      id: uuidv4(),
    });

    this.setState({ debits });

    this.props.handleAddDebits(amount);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(
      'Account Balance in Debit Class component:',
      this.props.accountBalance
    );
    return (
      <div>
        <Link to='/userprofile'>Profile</Link>
        <h1>Debit Transaction History</h1>
        <AccountBalance
          accountBalance={this.props.creditBalance - this.props.debitBalance}
        />

        <div className='AddDebitTransaction'>
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
            <button name='AddDebitButton'>Add Debit</button>
          </form>
        </div>

        <div className='showDebitHistory'>
          {this.props.debits.map((e) => {
            return (
              <div key={uuidv4()}>
                <h3>
                  {e.description} <div style={amountStyle}>{e.amount}</div>
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

export default Debits;
