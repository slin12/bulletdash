import React from "react";

const TrackerButton = props => {
  return (
    <div className="column" id="tracker">
      <div id="tracker-title">
        <button
          onClick={props.handleOpen}
          style={
            props.theme === "colorful"
              ? { backgroundColor: "#a62639" }
              : { backgroundColor: "#313233" }
          }
        >
          Launch Tracker
        </button>
      </div>
    </div>
  );
};

export default TrackerButton;
