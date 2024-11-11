import React, { createContext, useState } from "react";

export const TodoContext = createContext(); // 저장고 같은 느낌. TodoProvider의 자식 컴포넌트들이 자유롭게 접근할 수 있도록 외부에 선언

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, task: "투두 만들어보기" },
    { id: 2, task: "희연 혜원 혜윤 건 찬민" },
  ]);

  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState("");

  // 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100 + 2), task: text },
    ]);
    setText("");
  };

  // 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId("");
    setEditText("");
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        text,
        setText,
        editText,
        setEditText,
        editingId,
        setEditingId,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
