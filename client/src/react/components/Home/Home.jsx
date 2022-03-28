import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getRecipes } from "../../../redux/actions-creators";
import { Link } from "react-router-dom";

import "./Home.css";

import Recipe from "../Recipe/Recipe";
import Paginated from "../Paginated/Paginated";

export default function Home() {
  const dispatch = useDispatch();
  const recipesAll = useSelector((state) => state.recipesAll);

  const [actualPage, setActualPage] = useState(1);
  const recipesPerPage = 9;
  const lastRecipePerPage = actualPage * recipesPerPage; //1*9 index 10
  const firstRecipePerPage = lastRecipePerPage - recipesPerPage; // 9-9 = index 0

  const actualRecipesPerPage = recipesAll?.slice(
    firstRecipePerPage,
    lastRecipePerPage
  );

  const paginate = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <div className="cards__container">
        {actualRecipesPerPage?.map((el) => (
          <div className="cards__container-card">
            <Link key={el.id} to={`/home/${el.id}`}>
              <Recipe name={el.name} id={el.id} diets={el.diets} img={el.img} />
            </Link>
          </div>
        ))}
      </div>

      <Paginated
        paginate={paginate}
        recipesAll={recipesAll.length}
        recipesPerPage={recipesPerPage}
      />

    </div>
  );
}
