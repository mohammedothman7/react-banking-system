import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export class Credits extends Component {
  constructor() {
    super();
    this.state = {
      credits: [],
    };
  }

  componentDidMount() {
    const url = 'https://moj-api.herokuapp.com/credits';
    axios
      .get(url)
      .then((res) => {
        //console.log(res.data);
        let data = res.data;
        let credits = [];
        data.map((e) => {
          return credits.push({
            id: e.id,
            description: e.description,
            amount: e.amount,
            date: e.date,
          });
        });
        //console.log('debit value:', credits);
        this.setState({ credits });
        //this.setState({ credits: res });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let display;
    let debit = this.state.credits;
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

export default Credits;
