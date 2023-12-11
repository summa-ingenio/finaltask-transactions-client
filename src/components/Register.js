import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import Logo from "../images/bitcoin-logo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Function to handle to the registration of a user.
  const handleRegister = async () => {
    try {
      await axios.post(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/register",
        {
          username,
          password,
        }
      );

      const loginResponse = await axios.post(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/login",
        {
          username,
          password,
        }
      );

      const token = loginResponse.data.token;
      const decodedToken = jwtDecode(token);
      const loggedInUsername = decodedToken.username;

      // Set the users local tokens to determin login.
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUsername);

      navigate("/transactions");
    } catch (error) {
      console.error(
        "Registration failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="registration-container">
      <img src={Logo} alt="Logo" className="logo-register" />
      <h2 className="title-h2">Register</h2>
      <p className="register-p">Please use a gmail.com address to register</p>
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
