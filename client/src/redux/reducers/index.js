import { GET_RECIPES } from "../actions-types";

const initialState = {
  recipesAll: [],
  recipesBackUp: [],
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES :
      return {
        ...state,
        recipesAll: action.payload,
        recipesBackUp: action.payload,
      };
    default:
      return state;
  };
};