import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Home from "./components/home"; // Make sure the component name is correctly capitalized
import Login from "./components/login"; // Make sure the component name is correctly capitalized
import Register from "./components/Register";
import Todo from "./components/ToDoList"; // Make sure the component name is correctly capitalized

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
