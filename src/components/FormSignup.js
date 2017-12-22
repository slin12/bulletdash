import React from "react";
import { Link } from "react-router-dom";

class FormSignup extends React.Component {
  state = {
    usernameValue: "",
    passwordValue: "",
    confirmPasswordValue: "",
    firstNameValue: ""
  };

  handleChange = (event, key) => {
    this.setState({
      [key]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    });
  };

  render() {
    return (
      <div className="container">
        <h1 id="title">bulletdash</h1>
        <div id="signup">
          <h2>signup</h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label className="form" htmlFor="nameField">
                Username
              </label>
              <input
                type="text"
                id="nameField"
                value={this.state.usernameValue}
                onChange={e => this.handleChange(e, "usernameValue")}
              />
              <label className="form" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={this.state.passwordValue}
                onChange={e => this.handleChange(e, "passwordValue")}
              />
              <label className="form" htmlFor="password">
                Confirm Password{" "}
                {this.state.passwordValue ===
                this.state.confirmPasswordValue ? (
                  <i className="success icon-ok-sign" />
                ) : (
                  <i className="no-success icon-remove-sign" />
                )}
              </label>
              <input
                type="password"
                id="confirm-password"
                value={this.state.confirmPasswordValue}
                onChange={e => this.handleChange(e, "confirmPasswordValue")}
              />
              <label className="form" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={this.state.firstNameValue}
                onChange={e => this.handleChange(e, "firstNameValue")}
              />
              <Link to="/login">
                <small>Already Signed Up?</small>
              </Link>
              <br />
              <button className="form-button" type="submit">
                Signup
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default FormSignup;
