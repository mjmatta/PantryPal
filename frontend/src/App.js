import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import UserService from './services/UserService';

class App extends Component {


  
  state = {
    user: ""
  }

  async componentDidMount() {
    UserService.getUser().then((res) => {this.setState({user: res.data})
    console.log(this.state)})
  }

  render() {
    return (
      <h2>
        What's up {this.state.user}. Welcome.
      </h2>
    )
  }
}

export default App;