import React from "react";
import AuthAdapter from "../api/AuthAdapter";

class Notes extends React.Component {
  state = {
    value: this.props.noteValue,
    timeout: null
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    const typingTimeOut = setTimeout(() => {
      AuthAdapter.submitNote(this.state.value);
      console.log("timed out!");
    }, 3000);
    this.setState({ timeout: typingTimeOut });
  };

  render() {
    return (
      <div
        className="column column-50"
        id="notes"
        style={
          this.props.theme === "colorful"
            ? { backgroundColor: "#4da1a9" }
            : { backgroundColor: "#777777" }
        }
      >
        <h2>Notes</h2>
        <div className="notes-container">
          <textarea
            placeholder="What are you thinking about?"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default Notes;
