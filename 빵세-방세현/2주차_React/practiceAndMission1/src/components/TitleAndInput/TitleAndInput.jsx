import React from "react";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import "../../App.css";

const TitleAndInput = () => {
  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} id="titleAndInput">
      <h1 className="title">ToDoList</h1>
      <TextInput />
      <SubmitButton />
    </form>
  );
};

export default TitleAndInput;
