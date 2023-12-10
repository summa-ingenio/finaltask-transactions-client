// Home.js

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import Logo from "../images/bitcoin-logo.png";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  // Basic homepage that routes the users to the correct paths.
  return (
    <div className="home-container">
      <img src={Logo} alt="Logo" className="logo-home" />
      <h2 className="title-h2">Bitcoin Arbitrage</h2>
      <p className="p-home">
        Arbitrage rate refers to the percentage difference in the price of a
        financial instrument, such as Bitcoin, between two markets. In the
        context of this application, we focus on the arbitrage rate between
        Bitcoin prices in the United States and South Africa.
      </p>
      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Home;
