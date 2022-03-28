import React from "react";
import Diets from "../Diets/Diets";

export default function Filter({dietsAll,handleSelect}) {
  return (
    <select onChange={handleSelect}>
      <optgroup value="diets" label="Tipos de dieta">
        {
          dietsAll?.map(el => (
            <Diets key={el.id} value={el.name} name={el.name}/>
          ))
        }
      </optgroup>
    </select>
  );
}
