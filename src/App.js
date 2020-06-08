import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      debitBalance: 0,
      creditBalance: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
    };
  }

  componentDidMount() {
    this.getBalance();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Previous Props:', prevProps, 'Previous State:', prevState);
    this.render(this.DebitsComponent);
    this.render(this.CreditsComponent);
    console.log(
      'Account Balance after entering componentDidUpdate:',
      this.state.creditBalance
    );
  }

  handleAddCredits = (amount) => {
    let creditBalance = this.state.creditBalance + parseFloat(amount);
    this.setState({ creditBalance });
  };

  handleAddDebits = (amount) => {
    let debitBalance = this.state.debitBalance + parseFloat(amount);
    this.setState({ debitBalance });
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  getBalance = () => {
    const debitURL = 'https://moj-api.herokuapp.com/debits';
    const creditURL = 'https://moj-api.herokuapp.com/credits';
    let creditBalance = 0;
    let debitBalance = 0;
    let accountBalance = 0;
    axios
      .get(debitURL)
      .then((res) => {
        //console.log(res.data);
        let data = res.data;
        let debits = [];
        data.map((e) => {
          debitBalance += e.amount;
          return debits.push({
            id: e.id,
            description: e.description,
            amount: e.amount,
            date: e.date,
          });
        });
        console.log('debit value:', debits);
        this.setState({ debits, debitBalance });
        //this.setState({ debits: res });
        console.log('Debit Balance:', debitBalance);
      })
      .catch((err) => console.log(err));

    axios
      .get(creditURL)
      .then((res) => {
        //console.log(res.data);
        let data = res.data;
        let credits = [];
        data.map((e) => {
          creditBalance += e.amount;
          return credits.push({
            id: e.id,
            description: e.description,
            amount: e.amount,
            date: e.date,
          });
        });
        console.log('Credit Balance:', creditBalance);
        this.setState({ credits, creditBalance });
        accountBalance = creditBalance - debitBalance;
        //this.setState({ credits: res });
      })
      .catch((err) => console.log(err));
    console.log(
      'Credit Balance:',
      creditBalance,
      'Debit Balance',
      debitBalance
    );
    console.log(
      'Account Balance in getBalance method in App Class component',
      accountBalance,
      creditBalance,
      debitBalance
    );

    this.setState({ accountBalance });
  };

  render() {
    const HomeComponent = () => <Home />;
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        accountBalance={this.state.accountBalance}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );

    const DebitsComponent = () => (
      <Debits
        debits={this.state.debits}
        debitBalance={this.state.debitBalance}
        creditBalance={this.state.creditBalance}
        accountBalance={this.state.accountBalance}
        handleAddDebits={this.handleAddDebits}
      />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.credits}
        accountBalance={this.state.accountBalance}
        creditBalance={this.state.creditBalance}
        debitBalance={this.state.debitBalance}
        handleAddCredits={this.handleAddCredits}
      />
    );

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={HomeComponent} />
          <Route exact path='/userProfile' render={UserProfileComponent} />
          <Route exact path='/login' render={LogInComponent} />
          <Route exact path='/debits' render={DebitsComponent} />
          <Route exact path='/credits' render={CreditsComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
