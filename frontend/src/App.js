import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
