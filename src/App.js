import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar.js'
import ModuleContainer from './components/ModuleContainer.js'
import FormLogin from './components/FormLogin'
import FormSignup from './components/FormSignup'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {


  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={ FormLogin }/>
          <Route path="/signup" component={ FormSignup }/>
          <Route path="/dashboard" render={() =>
            <div className="container">
              <Navbar />
              <ModuleContainer />
            </div>} />
          </div>
      </Router>
    );
  }
}

export default App;
