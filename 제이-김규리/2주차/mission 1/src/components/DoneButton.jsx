import React from "react";
import "../../src/App.css";

const DoneButton = ({onClick}) => {
    return(
      <button onClick={onClick} className="DoneButton">done</button>
    );
}

export default DoneButton;