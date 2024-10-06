import React from "react";
import "../../src/App.css";

const EditIng = ({ onClick }) => {
  return (
    <button className="editButton" onClick={onClick}>
      수정 진행
    </button>
  );
};

export default EditIng;
