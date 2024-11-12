import { createContext, useState } from "react";

// 데이터를 담고 있음.
export const TodoContext = createContext();

// Provider가 우산같은 역할
export function TodoContextProvider({children}){
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [editId, setEditId] = useState("");
    const [editText, setEditText] = useState("");
    // 렌더링 방지
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    // 1. 추가하기
    const addTodo = (e) => {
      const unique = e.timeStamp;
      if(text === ""){ 
        alert('입력하세요');
        return;
      }
      setTodos((prev) => [
        ...prev,
        { id: unique, task: text }
      ]);
      setText("");
      console.log(unique);
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
        // App.jsx를 감싸서 우산 같은 역할
        // -> 전역으로 변수와 기능을 사용할 수 있음
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
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
            }}
        > 
        {children}
        </TodoContext.Provider>
    );
}