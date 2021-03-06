import {
  FILTER_PER_DIETS,
  GET_DIETS,
  GET_RECIPES,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_RECIPES_BY_NAME,
  GET_RECIPE_DETAIL,
  POST_RECIPE,
  DELETE_DETAIL,
  GET_RECIPE_BY_NAME_TWO,
  DELETE_DB_RECIPE,
  UPDATE_DB_RECIPE,
} from "../actions-types";

const initialState = {
  recipesAll: [],
  recipesBackUp: [],
  dietsAll: [],
  recipeDetail: {},
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
    case ORDER_BY_NAME:
      if (action.payload === "asc") {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      } else {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      }
    case ORDER_BY_SCORE:
      if (action.payload === "s+") {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a, b) => b.score - a.score),
        };
      } else {
        return {
          ...state,
          recipesAll: [...state.recipesAll]?.sort((a, b) => a.score - b.score),
        };
      }
    case GET_RECIPES_BY_NAME:
      let demo = state.recipesBackUp.filter((el) =>
        el.name?.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (demo.length) {
        return {
          ...state,
          recipesAll: demo,
        };
      } else {
        return {
          ...state,
          recipesAll: state.recipesBackUp,
        };
      }
    case GET_RECIPE_BY_NAME_TWO:
     return {
       ...state,
       recipesAll: action.payload,
     }
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case DELETE_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case DELETE_DB_RECIPE :
      return {
        ...state,
      };
    case UPDATE_DB_RECIPE :
      return {
        ...state,
      }
    default:
      return state;
  }
}
