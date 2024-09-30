import React from "react";
import "../../src/App.css";
const TextInput = ({ value, onChange }) => {
  return (
    <input
      className="TodoInput"
      type="text"
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
