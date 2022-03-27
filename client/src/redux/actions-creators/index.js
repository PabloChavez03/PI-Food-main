import axios from "axios";
import { GET_RECIPES } from "../actions-types";

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
}