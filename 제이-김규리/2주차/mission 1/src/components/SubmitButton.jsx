import React from "react";
import "../../src/App.css";

const SubmitButton = ({onClick}) => {
    return(
      <button onClick={onClick} type="submit" className="submitButton">submit</button>
    );
}

export default SubmitButton;