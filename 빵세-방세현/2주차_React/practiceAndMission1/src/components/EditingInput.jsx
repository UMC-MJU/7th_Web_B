import React from "react";
import "../../src/App.css";

const EditingInput = ({ onChange, defaultValue }) => {
  return (
    <input
      className="EditingInput"
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default EditingInput;
