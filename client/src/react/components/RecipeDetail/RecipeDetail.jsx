import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getRecipeDetail } from "../../../redux/actions-creators";

import "./RecipeDetail.css"

export default function RecipeDetail() {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const detailRecipe = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch,id]);

  return (
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
          <div className="detail__right-container-dishTypes">
            <h3>Dish Types</h3>
            <p>{detailRecipe.dishTypes}</p>
          </div>
          <div className="detail__right-container-diets">
            <h3>Diets</h3>
            <p>{detailRecipe.diets}</p>
          </div>
        </div>
        <div className="detail__right-container-summary">
          <h3>Steps</h3>
          <p>{detailRecipe.summary}</p>
        </div>
      </div>
    </div>
  );
}
