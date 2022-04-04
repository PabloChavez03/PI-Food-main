import React from "react";
import Diets from "../Diets/Diets";

import "./Filter.css"

export default function Filter({dietsAll,handleSelect}) {
  return (
    <select onChange={handleSelect} className="filter__container-select">
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
