import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./components/TodoContext";
import TitleAndInput from "./components/TitleAndInput/TitleAndInput";
import EachList from "./components/EachList/EachList";

function App() {
  return (
    <TodoProvider>
      <div id="entirePage">
        <TitleAndInput />
        <EachList />
      </div>
    </TodoProvider>
  );
}

export default App;
