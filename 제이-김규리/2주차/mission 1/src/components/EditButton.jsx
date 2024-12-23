import React from "react";
import "../../src/App.css";

const EditButton = ({onClick}) => {
    return(
      <button onClick={onClick} className="editButton">edit</button>
    );
}

export default EditButton;