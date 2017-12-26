import React from "react";

const TrackerButton = props => {
  return (
    <div className="column" id="tracker">
      <div id="tracker-title">
        <button onClick={props.handleOpen}>Launch Tracker</button>
      </div>
    </div>
  );
};

export default TrackerButton;
