import React from "react";
import "../../src/App.css";

const DeleteButton = ({onClick}) => {
    return(
      <button onClick={onClick} className="deleteButton">delete</button>
    );
}

export default DeleteButton;