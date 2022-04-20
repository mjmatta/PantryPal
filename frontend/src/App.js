import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import UserService from './services/UserService';
import FoodList from './components/FoodList';

class App extends Component {
  
  state = {
    user: "",
    food: []
  }

  componentDidMount() {
    UserService.getUser().then((res) => {this.setState({user: res.data})})
  }

  render() {
    console.log(this.state.food)
    return (
      <div>
      <h2>
        What's up {this.state.user}. Welcome.
      </h2>
      <FoodList/>
      </div>
    )
  }
}

export default App;