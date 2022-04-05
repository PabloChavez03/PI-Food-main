import React, { memo } from "react";

import "./Recipe.css";

function Recipe({ name, img, id, diets }) {
  return (
    <div className="recipe__container" key={id}>
      <img src={img} id="recipe__img" alt="img not found" />
      <h2>{name}</h2>
      <h3>{diets}</h3>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  let arrayBoolean = [];
  prevProps.name === nextProps.name
    ? arrayBoolean.push(true)
    : arrayBoolean.push(false);
  prevProps.img === nextProps.img
    ? arrayBoolean.push(true)
    : arrayBoolean.push(false);
  prevProps.id === nextProps.id
    ? arrayBoolean.push(true)
    : arrayBoolean.push(false);
  prevProps.diets === nextProps.diets
    ? arrayBoolean.push(true)
    : arrayBoolean.push(false);

  return arrayBoolean.every((el) => el === true);
};

export default memo(Recipe, areEqual);
