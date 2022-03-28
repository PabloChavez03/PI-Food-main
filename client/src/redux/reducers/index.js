import { FILTER_PER_DIETS, GET_DIETS, GET_RECIPES, ORDER_BY_NAME } from "../actions-types";

const initialState = {
  recipesAll: [],
  recipesBackUp: [],
  dietsAll: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipesAll: action.payload,
        recipesBackUp: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        dietsAll: action.payload,
      };
    case FILTER_PER_DIETS:
      return {
        ...state,
        recipesAll: state.recipesBackUp?.filter((el) =>
          el.diets?.includes(action.payload)
        ),
      };
    case ORDER_BY_NAME :
      if (action.payload === "asc") {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a,b) => a.name.localeCompare(b.name))
        };
      } else {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a,b) => b.name.localeCompare(a.name)),
        };
      };
    default:
      return state;
  }
}
