import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import UserService from './services/UserService';
import FoodService from './services/FoodService';

class App extends Component {


  
  state = {
    user: "",
    food: []
  }

  async componentDidMount() {
    UserService.getUser().then((res) => {this.setState({user: res.data})})
    FoodService.getFood().then((res) => {this.setState({food: res.data})})
  }

  render() {
    return (
      <div>
      <h2>
        What's up {this.state.user}. Welcome.
      </h2>
      <ul>
        {this.state.food.map((f) => <li>{f.name}, {f.cal}</li>)}
      </ul>
      </div>
    )
  }
}

export default App;