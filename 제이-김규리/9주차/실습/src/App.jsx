import { useState } from 'react'
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

function App() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const formattedTime = `${today.getHours()}: ${today.getMinutes()}`;

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <h1>{formattedDate}</h1>
        <p>{formattedTime}</p>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <InputTodo/>
        <TodoList/>
      </div>
    </>
  )
}

export default App
