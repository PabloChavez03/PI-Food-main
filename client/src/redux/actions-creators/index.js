import axios from "axios";
import { DELETE_DETAIL, FILTER_PER_DIETS, GET_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_BY_NAME_TWO, GET_RECIPE_DETAIL, ORDER_BY_NAME, ORDER_BY_SCORE } from "../actions-types";

export const getRecipes = () => {
  return function (dispatch) {
    return axios("/recipes")
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
    return axios("/types")
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

export const orderByScore = (value = "s+" || "s-") => {
  return {
    type: ORDER_BY_SCORE,
    payload: value,
  }
}

export const getRecipesByName = (name) => {
  return {
    type: GET_RECIPES_BY_NAME,
    payload: name,
  }
}

export const getRecipeDetail = (id) => {
  return function (dispatch) {
    return axios(`/recipes/${id}`)
      .then(response => response.data)
      .then(json => {
        dispatch({
          type: GET_RECIPE_DETAIL,
          payload: json,
        })
      })
  }
}

export const getRecipeByNameTwo = (name) => {
  return function (dispatch) {
    return axios(`/recipes?name=${name}`)
    .then(response => response.data)
    .then(json => {
      dispatch({
        type: GET_RECIPE_BY_NAME_TWO,
        payload: json,
      })
    })
  }
}

export const postRecipe = (info) => {
  return function (dispatch) {
    const post = axios.post("/recipe", info)
      .then(response => response);
    return post;    
  }
}

export const deleteDetail = () => {
  return {
    type: DELETE_DETAIL,
  }
}

export const deleteDbRecipe = (id) => {
  return function (dispatch) {
    return axios.delete(`/recipes/${id}`)
      .then(response => response);
  }
}

export const updateDbRecipe = (id,info) => {
  return function (dispatch) {
    const update = axios.patch(`/recipes/${id}`, info)
      .then(response => response);
    console.log(update);
    return update;
  }
}