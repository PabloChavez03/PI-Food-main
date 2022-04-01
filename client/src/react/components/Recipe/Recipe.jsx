import React from "react";

export default function Recipe ({name,img,id,diets}) {
  return (
    <div key={id}>
      <img src={img} alt="img not found" id="recipe__img" width="312" height="231"/>
      <h2>{name}</h2>
      <h3>{diets}</h3>
    </div>
  )
}