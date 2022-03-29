import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getRecipeDetail } from "../../../redux/actions-creators";

export default function RecipeDetail() {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const detailRecipe = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch]);

  return (
    <div>
      <h3>{detailRecipe.name}</h3>
      <h3>{detailRecipe.dishTypes}</h3>
      <h3>{detailRecipe.diets?.map((el) => el)}</h3>
      <span>{detailRecipe.summary}</span>
      <img src={detailRecipe.img} alt="img not found" />
    </div>
  );
}
