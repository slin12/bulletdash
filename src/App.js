import React, { Component } from "react";
import "./App.css";
import ModuleContainer from "./components/ModuleContainer.js";
import FormLogin from "./components/FormLogin";
import AuthAdapter from "./api/AuthAdapter";
import FormSignup from "./components/FormSignup";
import TrackerModal from "./components/TrackerModal";
import { Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    tracker: false
  };

  login = params => {
    AuthAdapter.login(params).then(user => {
      if (!user.error) {
        this.setState({
          auth: { loggedIn: true, user: user }
        });
        localStorage.setItem("jwt", user.jwt);
        this.props.history.push("/dashboard");
      }
    });
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  handleOpen = () => {
    this.setState({
      tracker: true
    });
  };

  handleClose = () => {
    console.log("closed");
    this.setState({
      tracker: false
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => {
            return localStorage.getItem("jwt") ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          path="/login"
          render={router => <FormLogin router={router} login={this.login} />}
        />
        <Route path="/signup" component={FormSignup} />
        <Route
          path="/dashboard"
          render={router => {
            return (
              <div>
                {this.state.tracker ? (
                  <TrackerModal handleClose={this.handleClose} />
                ) : null}
                <div className="container">
                  <ModuleContainer
                    router={router}
                    logout={this.logout}
                    handleOpen={this.handleOpen}
                  />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
