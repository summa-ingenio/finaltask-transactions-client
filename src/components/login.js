import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to the main application page if the user is already logged in
      navigate("/transactions");
    }
  }, [navigate]);

  //Funtion to handle and redirect users login.
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/login",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const loggedInUsername = decodedToken.username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUsername);

      // Check if the logged-in user is "caleb@gmail.com"
      if (loggedInUsername === "caleb@gmail.com") {
        navigate("/users");
      } else {
        // Redirect to the main application page for other users
        navigate("/transactions");
      }
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  //Login Form to allow the users to log in
  return (
    <div className="login-container">
      <h2 className="title-h2">Login</h2>
      <div className="form">
        <label htmlFor="login-username">Username:</label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
