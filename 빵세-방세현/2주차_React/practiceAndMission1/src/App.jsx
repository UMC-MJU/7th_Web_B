import { useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import SubmitButton from "./components/SubmitButton";
import EditingInput from "./components/EditingInput";
import DeleteButton from "./components/DeleteButton";
import EditComplete from "./components/EditComplete";
import EditIng from "./components/EditIng";
function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "투두 만들어보기" },
    { id: 2, task: "희연 혜원 혜윤 건 찬민" },
  ]);

  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState("");

  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    <div id="entirePage">
      <form onSubmit={handleSubmit} id="titleAndInput">
        <h1 className="title">ToDoList</h1>
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextInput>
        <SubmitButton
          onClick={() => {
            addTodo();
          }}
        ></SubmitButton>
      </form>
      <div>
        {todos.map((todo, _) => (
          <div className="eachList">
            {editingId !== todo.id && (
              <div key={todo.id} className="idAndTask">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div key={todo.id} className="idAndTask">
                <p>{todo.id}.</p>
                <EditingInput
                  onChange={(e) => setEditText(e.target.value)}
                  defaultValue={todo.task}
                />
              </div>
            )}
            <DeleteButton
              onClick={() => {
                deleteTodo(todo.id);
              }}
            />
            {editingId === todo.id ? (
              <EditComplete
                onClick={() => updateTodo(editingId, editText)}
              ></EditComplete>
            ) : (
              <EditIng onClick={() => setEditingId(todo.id)}></EditIng>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
