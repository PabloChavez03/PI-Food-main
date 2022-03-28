import React from "react";

export default function Ordening ({handleSelect}) {
  return (
    <select onChange={handleSelect}>
      <optgroup label="Ordenamiento">
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
        <option value="s+">Score +</option>
        <option value="s-">Score -</option>
      </optgroup>
    </select>
  );
}