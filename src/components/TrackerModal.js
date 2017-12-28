import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import AuthAdapter from "../api/AuthAdapter";
import moment from "moment";

class TrackerModal extends React.Component {
  state = {
    dateValue: "",
    stepValue: "",
    dates: [],
    data: []
  };

  componentDidMount() {
    AuthAdapter.fetchTrackerData().then(console.log);
  }

  data = () => {
    const data = {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Monday2",
        "Tuesday2"
      ],
      datasets: [
        {
          label: "Steps",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 100]
        }
      ]
    };
    return data;
  };

  handleStepChange = e => {
    this.setState({
      stepValue: e.target.value
    });
  };

  handleDateChange = e => {
    this.setState({
      dateValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    AuthAdapter.submitTracker(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div id="tracker-modal">
        <div id="tracker-container">
          <span id="tracker-title"> Step Tracker</span>
          <span id="tracker-close" onClick={this.props.handleClose}>
            <a>x</a>
          </span>
          <div id="tracker-graph">
            <HorizontalBar data={this.data()} legend={{ display: false }} />
          </div>
          <div id="tracker-add">
            <form onSubmit={this.handleSubmit}>
              <input
                type="date"
                id="date-value"
                onChange={this.handleDateChange}
              />
              <input
                type="text"
                id="steps-value"
                placeholder="No. of Steps"
                value={this.state.stepValue}
                onChange={this.handleStepChange}
              />
              <input type="submit" id="tracker-submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackerModal;
