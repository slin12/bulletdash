import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import ModuleContainer from './components/ModuleContainer.js'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <ModuleContainer />
      </div>
    );
  }
}

export default App;
