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
    AuthAdapter.fetchTrackerData().then(json => this.setData(json));
  }

  setData = json => {
    const steps = json.map(t => t.steps);
    const dates = json.map(t => moment(t.date_format).format("MMM Do"));
    this.setState({
      dates: dates,
      data: steps
    });
  };

  data = () => {
    const data = {
      labels: this.state.dates,
      datasets: [
        {
          label: "Steps",
          backgroundColor: "rgba(77, 162, 170, 0.5)",
          borderColor: "#016FB9",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 166, 48, 0.5)",
          hoverBorderColor: "#E4572E",
          data: this.state.data
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
    AuthAdapter.submitTracker(this.state).then(json => this.setData(json));
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
