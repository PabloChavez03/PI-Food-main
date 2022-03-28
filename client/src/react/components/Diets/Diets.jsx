import React from "react";

export default function Diets ({id,name}) {
  return (
    <option key={id} value={name} name={name}>{name}</option>
  )
} 