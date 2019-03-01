import React, { Component } from 'react';

import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/home/Home'
import Headers from './components/navHeader/Headers';
import Login from './components/pages/Login';
import Game from './components/pages/Game';
import Register from './components/pages/Register';
import Cart from './components/pages/Cart';
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Headers />
          <div className="container">
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/game/:id" component={Game}/>
            <Route exact path="/cart" component={Cart}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
