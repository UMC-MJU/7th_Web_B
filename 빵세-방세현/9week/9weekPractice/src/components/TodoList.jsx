import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
// import s from "./TodoList.module.css";

export default function TodoList() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  console.log(todolist);

  const todolistView = todolist.map((todo, idx) => (
    <li key={todolist[idx].id}>
      <input
        type="checkbox"
        onChange={() => dispatch(complete(todolist[idx].id))}
      />
      <div>
        {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}
      </div>
      <button type="button" onClick={() => dispatch(remove(todolist[idx].id))}>
        삭제
      </button>
    </li>
  ));

  return (
    <>
      <ul>{todolistView}</ul>
    </>
  );
}
