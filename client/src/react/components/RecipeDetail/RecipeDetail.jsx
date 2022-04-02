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
      <h3>{detailRecipe.name}</h3>
      <h3>{detailRecipe.dishTypes}</h3>
      <h3>{detailRecipe.diets}</h3>
      <h3>{detailRecipe.score}</h3>
      <h3>{detailRecipe.healthScore}</h3>
      <span>{detailRecipe.summary}</span>
      <img src={detailRecipe.img} alt="img not found" />
    </div>
  );
}
