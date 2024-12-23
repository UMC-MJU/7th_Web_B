import React from "react";
import "../../src/App.css";

const EditInput = ({value, onChange, defaultValue}) => {
    return(
      <input 
        type='text'
        value={value} 
        onChange={onChange} 
        defaultValue={defaultValue}
        className="editInput"
      >
      </input>
    );
}

export default EditInput;  