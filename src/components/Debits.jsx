import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

class Debits extends Component {
  constructor() {
    super();
    this.state = {
      debits: [],
    };
  }

  componentDidMount() {
    const url = 'https://moj-api.herokuapp.com/debits';
    axios
      .get(url)
      .then((res) => {
        //console.log(res.data);
        let data = res.data;
        let debits = [];
        data.map((e) => {
          return debits.push({
            id: e.id,
            description: e.description,
            amount: e.amount,
            date: e.date,
          });
        });
        //console.log('debit value:', debits);
        this.setState({ debits });
        //this.setState({ debits: res });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let display;
    let debit = this.state.debits;
    if (debit) {
      // console.log('Debit is:', debit);
      display = debit.map((e) => {
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
      });

      return display;
    } else {
      display = <>Waiting...</>;
    }

    return (
      <div>
        <Link to='/'>Home</Link>
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
