import React from "react";

export default function Recipe ({name,img,id,diets}) {
  return (
    <div key={id}>
      <h3>{id}</h3>
      <h3>{name}</h3>
      <h2>{diets}</h2>
      <img src={img} alt="img not found"/>
    </div>
  )
}