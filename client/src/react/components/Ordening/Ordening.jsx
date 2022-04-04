import React from "react";

import "./Ordering.css";

export default function Ordening ({handleSelect}) {
  return (
    <select onChange={handleSelect} className="ordering__container-select">
      <optgroup label="Ordenamiento">
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
        <option value="s+">Score +</option>
        <option value="s-">Score -</option>
      </optgroup>
    </select>
  );
}