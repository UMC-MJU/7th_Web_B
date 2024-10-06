import React from "react";
import "../../src/App.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="deleteButton" onClick={onClick}>
      삭제하기
    </button>
  );
};

export default DeleteButton;
