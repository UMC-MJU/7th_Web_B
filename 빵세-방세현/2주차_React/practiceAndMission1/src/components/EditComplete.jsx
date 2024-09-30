import React from "react";
import "../../src/App.css";

const EditComplete = ({ onClick }) => {
  return (
    <button className="editButton" onClick={onClick}>
      수정 완료{" "}
    </button>
  );
};

export default EditComplete;
