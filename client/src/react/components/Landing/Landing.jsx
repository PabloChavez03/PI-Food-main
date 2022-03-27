import React from "react";
import { Link } from "react-router-dom";

export default function Landing () {
  return (
    <div>
      <h1>Welcome to PI Food</h1>
      <Link to={"/home"}><button>Ir a Home</button></Link>
    </div>
  )
}