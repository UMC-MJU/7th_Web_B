import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import "../../App.css";
const SubmitButton = () => {
  const { addTodo } = useContext(TodoContext);
  // 중괄호로 분리해서 받아와야 함. 안그러면 addTodo가 객체가 되어버림.

  return (
    <button className="submitButton" onClick={addTodo} type="submit">
      할 일 등록
    </button>
  );
};

export default SubmitButton;
