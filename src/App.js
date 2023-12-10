import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/Register";
import Todo from "./components/ToDoList";
import Users from "./components/users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Todo />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
