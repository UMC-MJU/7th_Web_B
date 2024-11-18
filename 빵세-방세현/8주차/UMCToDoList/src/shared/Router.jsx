import React from "react";
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "../components/TodoList";
import ParticularPage from "../components/ParticularPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:id" element={<ParticularPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
