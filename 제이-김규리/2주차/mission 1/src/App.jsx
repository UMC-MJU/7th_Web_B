import { useState, useContext, createContext } from 'react';
import "./App.css";
import DeleteButton from "./components/DeleteButton";
import DoneButton from "./components/DoneButton";
import EditButton from "./components/EditButton";
import MainInput from "./components/MainInput";
import EditInput from "./components/EditInput";
import SubmitButton from "./components/SubmitButton";
import { TodoContext } from './context/TodoContext';

// 컴포넌트의 이름은 대문자로 시작
function App() {
  const {
    todos,
    text,
    setText,
    editId,
    setEditId,
    editText,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    editTodo,
  } = useContext(TodoContext);


  return (
    <>
      <h1>Todo-list</h1>
      <form onSubmit={handleSubmit}>
        <MainInput 
          value={text}  
          onChange={(e) => setText(e.target.value)} 
        />

        <SubmitButton onClick={(e) => addTodo(e)}/>
      </form>
      <div>
        {todos.map((todo) => 
          <div className="items" key={todo.id}>
            {editId === todo.id ? (
              <EditInput defaultValue={todo.task}
                onChange={(e) => setEditText(e.target.value)}
              />
              ) : (
              <p>{todo.task}</p>
            )} 
            <DeleteButton onClick={() => deleteTodo(todo.id)}/>
            {editId !== todo.id ? (
                // edit버튼을 누르면 EditText를 todo.task로 초기화 하자
                <EditButton 
                  onClick={() => {setEditId(todo.id); setEditText(todo.task);}}/>
              ) : (
                <DoneButton 
                  onClick={() => editTodo(editId, editText)}
                />
            )}        
          </div>    
        )}
      </div>
   </>
  );
}

export default App