import React from "react";

const SubmitButton = ({ onClick }) => {
  return (
    <button onClick={onClick} type="submit">
      할 일 등록
    </button>
  );
};

export default SubmitButton;
