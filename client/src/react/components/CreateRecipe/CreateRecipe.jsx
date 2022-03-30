import React, { useEffect, useState } from "react";
import Diets from "../Diets/Diets";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, postRecipe } from "../../../redux/actions-creators";
import { useNavigate } from "react-router-dom";

import "./CreateRecipe.css";

export default function CreateRecipe() {
  const dietsAll = useSelector((state) => state.dietsAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    summary: "",
    score: "",
    healthScore: "",
    img: "",
    steps: "",
    diets: [],
  };

  const [input, setInput] = useState(initialState);
  const [error, setError] = useState(initialState);

  const validate = (input) => {
    let err = {};
    setError(initialState);

    if (!input.name) {
      err.name = "Debe ingresar un nombre";
    }
    if (!input.summary) {
      err.summary = "Debe ingresar un resumen";
    }
    if (!input.score) {
      err.score = "Debe ingresar una puntuación";
    }
    if (!input.healthScore) {
      err.healthScore = "Debe ingresar una puntuación de comida saludable";
    }
    if (!input.img) {
      err.img = "Debe ingresar una imagen";
    }
    if (!input.steps) {
      err.steps = "Debe ingresar los pasos de la receta";
    }
    if (!input.diets.lenght) {
      err.diets = "Debe ingresar al menos un tipo de dieta";
    }

    return err;
  }

  const handleInputOnChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
    //demoError
    setError(validate({ 
      ...input, 
      [name]: value }));
  };

  const handleSelectOnChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setInput({
      ...input,
      diets: [...input.diets, value],
    });

    //set Error a revisar 

    setError(
      validate({
        ...input,
        diets: value,
      })
    );
  };

  const handleDeleteSelect = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter(el => el !== value),
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Receta creada");
    navigate("/home");
    // console.log(input);
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="form__container">
      <form className="form__form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Name recipe"
          name="name"
          value={input.name}
          onChange={handleInputOnChange}
        />
        <textarea
          placeholder="Summary"
          cols="30"
          rows="6"
          name="summary"
          value={input.summary}
          onChange={handleInputOnChange}
        />
        <input
          type="number"
          placeholder="Score"
          name="score"
          value={input.score}
          onChange={handleInputOnChange}
        />
        <input
          type="number"
          placeholder="Health Score"
          name="healthScore"
          value={input.healthScore}
          onChange={handleInputOnChange}
        />
        <input
          type="text"
          placeholder="Image"
          name="img"
          value={input.img}
          onChange={handleInputOnChange}
        />
        <textarea
          placeholder="Steps"
          cols="30"
          rows="10"
          name="steps"
          value={input.steps}
          onChange={handleInputOnChange}
        />
        <div>
          {input.diets?.map((el) => (
            <p key={el}>
              <p key={el} value={el}>{el}</p>
              <button value={el} onClick={(e) => handleDeleteSelect(e)}>
                x
              </button>
            </p>
          ))}
        </div>
        <select onChange={(e) => handleSelectOnChange(e)}>
          <optgroup value="diets" label="Tipos de dieta">
            {dietsAll?.map((el) => (
              <Diets key={el.id} value={el.name} name={el.name} />
            ))}
          </optgroup>
        </select>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
