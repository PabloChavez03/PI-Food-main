import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetail,deleteDetail,deleteDbRecipe } from "../../../redux/actions-creators";

import "./RecipeDetail.css";

import Loader from "../Loader/Loader";

export default function RecipeDetail() {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let detailRecipe = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
      return () => {
        dispatch(deleteDetail());
        //CUANDO SALGO DEL DETAIL SE DESMONTA
      }
  }, [dispatch, id]);

  const isUUID = (id) => {
    const regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return regex.test(id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (isUUID(id)) {
      dispatch(deleteDbRecipe(id));
    }
    alert("Se elimino la receta correctamente");
    navigate("/home");
  }

  return (
    <div>
      {!Object.values(detailRecipe).length ? (
        <Loader />
      ) : (
        <div className="detail__container">
          <div className="detail__left-container">
            <h3>{detailRecipe.name}</h3>
            <img src={detailRecipe.img} alt="img not found" id="detail__img" />
            <div className="detail__left-container-score">
              <div className="detail__left-container-score-scoreII">
                <label>Score</label>
                <h3>⭐ {detailRecipe.score}</h3>
              </div>
              <div className="detail__left-container-score-healthScore">
                <label>Health Score</label>
                <h3>⭐ {detailRecipe.healthScore}</h3>
              </div>
            </div>
          </div>
          <div className="detail__right-container">
            <div className="detail__right-container-types">
              <div
                hidden={!detailRecipe.dishTypes}
                className="detail__right-container-dishTypes"
              >
                <h3>Dish Types</h3>
                <p>{detailRecipe.dishTypes}</p>
              </div>
              <div
                hidden={!detailRecipe.diets}
                className="detail__right-container-diets"
              >
                <h3>Diets</h3>
                <p>{detailRecipe.diets}</p>
              </div>
            </div>
            <div
              hidden={!detailRecipe.summary}
              className="detail__right-container-summary"
            >
              <h3>Summary</h3>
              <p>{detailRecipe.summary}</p>
            </div>
            <div
              hidden={!detailRecipe.steps}
              className="detail__right-container-steps"
            >
              <h3>Steps</h3>
              <p>{detailRecipe.steps}</p>
            </div>
            <div className="detail__right-container-upgrade">
              <button hidden={!isUUID(id)} className="detail__right-container-upgrade-x" onClick={handleDelete}>Delete</button>
              <button hidden={!isUUID(id)} className="detail__right-container-upgrade-y">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
