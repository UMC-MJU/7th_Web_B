import React from "react";
import "../../src/App.css";

function MainInput({value, onChange}){
    return(
      <input 
        type='text'
        value={value} 
        onChange={onChange} 
        placeholder="add item"
        className="mainInput"
      >
      </input>
    );
  }

  export default MainInput;