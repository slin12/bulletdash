import React from "react";
import { Link } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";

class FormLogin extends React.Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    if (localStorage.getItem("jwt")) {
      this.props.router.history.push("/dashboard");
    }
  }

  handleChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <div className="container">
        <h1 id="title">bulletdash</h1>
        <CSSTransitionGroup
          transitionName="login"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div id="login" key="login-div">
            <h2>login</h2>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label className="form" htmlFor="nameField">
                  Username
                </label>
                <input
                  type="text"
                  id="nameField"
                  value={this.state.username}
                  onChange={e => this.handleChange(e.target.value, "username")}
                />
                <label className="form" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e.target.value, "password")}
                />
                <Link to="/signup">
                  <small>Not Signed Up?</small>
                </Link>
                <br />
                <button className="form-button" type="submit">
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default FormLogin;
