import React, { Component } from 'react';

import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Home from './components/home/Home'
import Headers from './components/navHeader/Headers';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Headers />
          <div className="container">
            <Route exact path="/" component={Home}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
