import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {
  return (
    <div class='progress progress-bar-container' id="progressBar" style={{display:'none'}}>
      <div
        class='progress-bar progress-bar-striped progress-bar-animated'
        role='progressbar'
        aria-valuenow='50'
        aria-valuemin='0'
        aria-valuemax='100'
        style={{ width: "50%" }}>
        &nbsp;
      </div>
    </div>
  );
};

export default ProgressBar;
