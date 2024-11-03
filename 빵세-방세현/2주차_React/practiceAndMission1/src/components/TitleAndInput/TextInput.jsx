import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import "../../App.css";

const TextInput = () => {
  const { text, setText } = useContext(TodoContext);

  return (
    <input
      className="TodoInput"
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default TextInput;
