import { useState } from 'react';
import "./App.css";

// 컴포넌트의 이름은 대문자로 시작
function Button({onClick, text, type='button', className}){
  return(
    <button onClick={onClick} type={type} className={className}>{text}</button>
  );
}

function Input({value, onChange, defaultValue, placeholder, className}){
  return(
    <input 
      type='text'
      value={value} 
      onChange={onChange} 
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={className}
    >
    </input>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  // 1. 추가하기
  const addTodo = () => {
    if(text === ""){ 
      alert('입력하세요');
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text }
    ]);
    setText("");
  };

 // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => (
      prev.filter((todo) => todo.id !== id)
    ));
  };

 // 3. 수정하기
  const editTodo = (id, txt) => {
    if(txt === "" && txt === text){
      alert('please enter');
      return;
    } 
    setTodos((prev) => 
      // todo는 id한개 task한개
      prev.map((todo) => 
        todo.id === id ? {...todo, task: txt} : todo) 
      );
    setEditId("");
  };

  return (
    <>
      <h1>Todo-list</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          className="mainInput"
          value={text}  
          onChange={(e) => setText(e.target.value)} 
          type='text' 
          placeholder="add item"
        />
        <Button className="submitButton" type='submit' onClick={addTodo} text="제출"/>
      </form>
      <div>
        {todos.map((todo) => 
          <div className="items" key={todo.id}>
            {editId === todo.id ? (
              <Input className="editInput" type='text' 
                defaultValue={todo.task}
                onChange={(e) => setEditText(e.target.value)}
              />
              ) : (
              <p>{todo.task}</p>
            )} 
            <Button 
              className="deleteButton"  
              text="Delete" onClick={() => deleteTodo(todo.id)}
            />
            {editId !== todo.id ? (
                // edit버튼을 누르면 EditText를 todo.task로 초기화 하자
                <Button 
                  className="editButton" 
                  text="Edit" 
                  onClick={() => {setEditId(todo.id); setEditText(todo.task);}}
                />
              ) : (
                <Button 
                  className="doneButton" 
                  text="Done" 
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