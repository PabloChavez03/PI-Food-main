import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css"

export default function Landing () {
  return (
    <div className="landing__container">
      <div className="landing__home">
        <h1>Welcome to PI Food</h1>
        <Link to={"/home"}>
          <button>Ir a Home</button>
        </Link>
      </div>
    </div>
  );
}