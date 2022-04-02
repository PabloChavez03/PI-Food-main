import React from "react";

import "./Recipe.css"

export default function Recipe ({name,img,id,diets}) {
  return (
    <div className="recipe__container" key={id}>
      <img
        src={img}
        id="recipe__img"
        alt="img not found"
      />
      <h2>{name}</h2>
      <h3>{diets}</h3>
    </div>
  );
}