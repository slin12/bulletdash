import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 100]
    }
  ]
};

class TrackerModal extends React.Component {
  render() {
    return (
      <div id="tracker-modal">
        <div id="tracker-container">
          <span id="tracker-title">Tracker</span>
          <span id="tracker-close" onClick={this.props.handleClose}>
            <a>x</a>
          </span>
          <div id="tracker-graph">
            <HorizontalBar data={data} legend={{ display: false }} />
          </div>
          <div id="tracker-add">
            <h4>Add Data</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackerModal;
