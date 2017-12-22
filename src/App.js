import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import ModuleContainer from "./components/ModuleContainer.js";
import FormLogin from "./components/FormLogin";
import AuthAdapter from "./api/AuthAdapter";
import FormSignup from "./components/FormSignup";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    auth: { loggedIn: false, user: null }
  };

  login = params => {
    AuthAdapter.login(params).then(user => {
      if (!user.error) {
        this.setState({
          auth: { loggedIn: true, user: user }
        });
        localStorage.setItem("token", user.jwt);
        <Redirect to="/dashboard" />;
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.auth.isLoggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/login"
            render={() => <FormLogin login={this.login} />}
          />
          <Route path="/signup" component={FormSignup} />
          <Route
            path="/dashboard"
            render={router => (
              <div className="container">
                <Navbar />
                <ModuleContainer router={router} />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
