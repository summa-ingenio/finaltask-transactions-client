import React from "react";
import { useNavigate } from "react-router-dom";

//logout the user and clear any local tokens stored

const LogoutButton = () => {
  const navigate = useNavigate();

  const clearToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const handleLogout = () => {
    clearToken();

    // Redirect to the login page after logout
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
