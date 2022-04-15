import React, { useEffect, useState } from "react";
import Diets from "../Diets/Diets";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, updateDbRecipe } from "../../../redux/actions-creators";
import { useNavigate,useParams } from "react-router-dom";

import "./UpdateRecipe.css";
import Loader from "../Loader/Loader";

export default function UpdateRecipe() {
  const dietsAll = useSelector((state) => state.dietsAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
  // const [loading, setLoading] = useState(true);

  const validateImg = (urlImg) => {
    const regex = /.*\.(gif|jpe?g|bmp|png)$/gim;
    return regex.test(urlImg);
  };

  const validate = (input) => {
    let err = {};
    // setError(initialState);

    if (!input.name) {
      err.name = "Debe ingresar un nombre";
    }
    if (!input.summary) {
      err.summary = "Debe ingresar un resumen";
    }
    if (!input.score) {
      err.score = "Debe ingresar una puntuación";
    } else if (input.score && input.score > 100) {
      err.score = "La puntuación debe ser menor a 100";
    }
    if (!input.healthScore) {
      err.healthScore = "Debe ingresar una puntuación de comida saludable";
    } else if (input.healthScore && input.healthScore > 100) {
      err.healthScore =
        "La puntuación de comida saludable debe ser menor a 100";
    }
    if (!input.img) {
      err.img = "Debe ingresar una imagen de la receta";
    } else if (!validateImg(input.img)) {
      err.img = "La url ingresada no es una imagen";
    }
    if (!input.steps) {
      err.steps = "Debe ingresar los pasos a seguir para realizar la receta";
    }
    if (!input.diets.length) {
      err.diets = "Debe ingresar al menos un tipo de dieta";
    }

    return err;
  };

  const handleInputOnChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    setError(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSelectOnChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      diets: [...input.diets, value],
    }));

    //set Error a revisar

    setError(
      validate({
        ...input,
        diets: [...input.diets, value],
      })
    );
  };

  const handleDeleteSelect = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      diets: prev.diets.filter((el) => el !== value),
    }));

    setError(
      validate({
        ...input,
        diets: input.diets.filter((el) => el !== value),
      })
    );
  };

  const validateInput = (input) => {
    let okey = {};
    for (let key in input) {
      if (input[key]) {
        okey[key] = input[key]
      } else if (Array.isArray(input[key])) {
        okey[key] = input[key]
      }
    };

    return okey
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (Object.values(error).length === 7) {
      alert("Faltan campos que rellenar");
    } else {  
      dispatch(updateDbRecipe(id, validateInput(input)));
      alert("Receta actualizada correctamente");
      navigate("/home");
      console.log(input);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="form__container">
      {!dietsAll.length ? (
        <Loader />
      ) : (
        <form className="form__form" onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Name recipe"
            name="name"
            value={input.name}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.name}>{error.name}</label>

          <textarea
            placeholder="Summary"
            cols="30"
            rows="6"
            name="summary"
            value={input.summary}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.summary}>{error.summary}</label>

          <input
            type="number"
            placeholder="Score"
            name="score"
            value={input.score}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.score}>{error.score}</label>
          <input
            type="number"
            placeholder="Health Score"
            name="healthScore"
            value={input.healthScore}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.healthScore}>{error.healthScore}</label>

          <input
            type="text"
            placeholder="Image"
            name="img"
            value={input.img}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.img}>{error.img}</label>

          <textarea
            placeholder="Steps"
            cols="30"
            rows="10"
            name="steps"
            value={input.steps}
            onChange={handleInputOnChange}
          />
          <label hidden={!error.steps}>{error.steps}</label>

          <div className="diets_select__container">
            {input.diets?.map((el) => (
              <div key={el} className="diets_select__container-add">
                <span key={el} value={el}>
                  {el}
                </span>
                <button value={el} onClick={(e) => handleDeleteSelect(e)}>
                  x
                </button>
              </div>
            ))}
          </div>

          <select onChange={(e) => handleSelectOnChange(e)} multiple={true}>
            <optgroup value="diets" label="Tipos de dieta">
              {dietsAll?.map((el) => (
                <Diets key={el.id} value={el.name} name={el.name} />
              ))}
            </optgroup>
          </select>
          <label hidden={!error.diets}>{error.diets}</label>

          <div className="form__buttons">
            <input
              type="submit"
              value="Update"
              disabled={Object.values(error).length === 7 ? true : false}
              // hidden={Object.values(input).length === 0 ? true : false}
              id="form__form-submit"
            />
            <button onClick={handleCancel} id="form__form-cancel">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
