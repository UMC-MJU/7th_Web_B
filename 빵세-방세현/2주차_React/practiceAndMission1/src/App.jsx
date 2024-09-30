// import { useState } from "react";
// import "./App.css";
// // 36:04
// function App() {
//   const [todos, setTodos] = useState([
//     { id: 1, task: "투두 만들어보기" },
//     { id: 2, task: "희연 혜원 혜윤 건 찬민" },
//   ]);

//   const [text, setText] = useState("");
//   const [editText, setEditText] = useState("");
//   const [editingId, setEditingId] = useState("");

//   // 렌더링 방지
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   // 추가하기
//   const addTodo = () => {
//     setTodos((prev) => [
//       ...prev,
//       { id: Math.floor(Math.random() * 100 + 2), task: text },
//     ]);
//     setText("");
//   };

//   // 삭제하기
//   const deleteTodo = (id) => {
//     setTodos((prev) => prev.filter((item) => item.id !== id));
//   };

//   // 수정하기
//   const updateTodo = (id, text) => {
//     setTodos((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, task: text } : item))
//     );
//     setEditingId("");
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         ></input>
//         <button
//           onClick={() => {
//             addTodo();
//           }}
//           type="submit"
//         >
//           할 일 등록
//         </button>
//       </form>
//       <div>
//         {todos.map((todo, _) => (
//           <div style={{ display: "flex", gap: "20px" }}>
//             {editingId !== todo.id && (
//               <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
//                 <p>{todo.id},</p>
//                 <p>{todo.task}</p>
//               </div>
//             )}
//             {editingId === todo.id && (
//               <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
//                 <p>{todo.id},</p>
//                 <input
//                   onChange={(e) => setEditText(e.target.value)}
//                   defaultValue={todo.task}
//                 />
//               </div>
//             )}
//             <button
//               onClick={() => {
//                 deleteTodo(todo.id);
//               }}
//             >
//               삭제하기
//             </button>
//             {editingId === todo.id ? (
//               <button onClick={() => updateTodo(editingId, editText)}>
//                 수정 완료
//               </button>
//             ) : (
//               <button onClick={() => setEditingId(todo.id)}>수정 진행</button>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;

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
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <div style={{ display: "flex", gap: "20px" }}>
            {editingId !== todo.id && (
              <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
                <p>{todo.id},</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
                <p>{todo.id},</p>
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
    </>
  );
}

export default App;
