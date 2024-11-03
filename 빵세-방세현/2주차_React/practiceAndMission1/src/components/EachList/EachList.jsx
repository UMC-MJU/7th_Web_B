import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import "../../App.css";
import EditingInput from "./EditingInput";
import DeleteButton from "./DeleteButton";
import EditComplete from "./EditComplete";
import EditIng from "./EditIng";

const EachList = () => {
  const {
    editingId,
    editText,
    todos,
    setEditText,
    deleteTodo,
    updateTodo,
    setEditingId,
  } = useContext(TodoContext);
  /*해당 부분은 map 함수를 돌면서 대입하기 때문에 
  각각의 컴포넌트 안에서 useContext를 활용하기보단
  아래 방식처럼 대입해주는 게 나을 것이라 판단  */
  return (
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
            <EditIng
              onClick={() => {
                setEditingId(todo.id);
                setEditText(todo.task);
              }}
            ></EditIng>
          )}
        </div>
      ))}
    </div>
  );
};

export default EachList;
