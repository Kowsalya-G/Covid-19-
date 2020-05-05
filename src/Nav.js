import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Nav() {
  return (
    <nav>
      <h2 id="header" className="covid-header">
        Covid-19 Live status
      </h2>
      <ul className="nav-links">
        <Link to="/">
          <li>World (Country-wise)</li>
        </Link>
        <Link to="/india">
          <li>India (State-wise)</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
