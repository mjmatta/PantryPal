import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import UserService from './services/UserService';
import FoodList from './components/FoodList';
import FoodEdit from './components/FoodEdit';

class App extends Component {
  
  state = {
    user: "",
    food: [],
    id: ''
  }

  componentDidMount() {
    UserService.getUser().then((res) => {this.setState({user: res.data})})
  }

  render() {
    return (
      <div>
      <h2>
        What's up {this.state.user}. Welcome!
      </h2>

      <Router>
      <Switch>
        <Route path='/' exact={true} component={FoodList}/>
        <Route path='/myfood' exact={true} component={FoodList}/>
        <Route path='/myfood/:id' component={FoodEdit}/>
        <Route path='/logout' component={() => {
          window.location.href = 'https://therealpantrypal.herokuapp.com/logout';
          return null;
        }}/>
      </Switch>
      </Router>
      </div>
    )
  }
}

export default App;