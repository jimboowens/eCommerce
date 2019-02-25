import React, { Component } from 'react';
import Home from './components/home/Home'
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="container">
      <NavBar/>
      <Home/>
      </div>
    );
  }
}

export default App;
