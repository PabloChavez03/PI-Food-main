import React from "react";

import "./About.css"
import image from "./cooking.png"

export default function About () {
  return (
    <div className="about__container">
      <h1>PI de Pablo Chávez</h1>
      <img src={image} alt="" />
    </div>
  )
}