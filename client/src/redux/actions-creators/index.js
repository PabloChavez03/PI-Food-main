import axios from "axios";
import { FILTER_PER_DIETS, GET_DIETS, GET_RECIPES, ORDER_BY_NAME } from "../actions-types";

export const getRecipes = () => {
  return function (dispatch) {
    return axios("http://localhost:3001/recipes")
      .then((response) => response.data)
      .then((json) => {
        dispatch({
          type: GET_RECIPES,
          payload: json,
        })
      })
  }
};

export const getDiets = () => {
  return function (dispatch) {
    return axios("http://localhost:3001/types")
      .then(response => response.data)
      .then(json => {
        dispatch({
          type: GET_DIETS,
          payload: json,
        })
      })
  }
};

export const filterPerDiets = (value) => {
  return {
    type: FILTER_PER_DIETS,
    payload: value,
  }
}

export const orderByName = (value = "asc" || "desc") => {
  return {
    type: ORDER_BY_NAME,
    payload: value,
  }
}