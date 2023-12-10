// Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "../Navbar.css";
import Logo from "../images/bitcoin-logo.png";

//Top nav bar to alow the user to go back home or logout
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <ul>
        <li className="logout">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
