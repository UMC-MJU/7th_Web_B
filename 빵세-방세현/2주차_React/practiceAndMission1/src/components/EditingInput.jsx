import React from "react";

const EditingInput = ({ onChange, defaultValue }) => {
  return <input onChange={onChange} defaultValue={defaultValue} />;
};

export default EditingInput;
