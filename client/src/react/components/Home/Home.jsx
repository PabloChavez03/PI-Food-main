import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  filterPerDiets,
  getDiets,
  getRecipes,
  orderByName,
  orderByScore,
} from "../../../redux/actions-creators";
import { Link } from "react-router-dom";

import "./Home.css";

import Recipe from "../Recipe/Recipe";
import Paginated from "../Paginated/Paginated";
import Filter from "../Filter/Filter";
import Ordening from "../Ordening/Ordening";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const recipesAll = useSelector((state) => state.recipesAll);
  const dietsAll = useSelector((state) => state.dietsAll);

  const [actualPage, setActualPage] = useState(1);
  const recipesPerPage = 9;
  const lastRecipePerPage = actualPage * recipesPerPage; //1*9 index 10
  const firstRecipePerPage = lastRecipePerPage - recipesPerPage; // 9-9 = index 0

  const actualRecipesPerPage = recipesAll?.slice(
    firstRecipePerPage,
    lastRecipePerPage
  );

  // const [loading, setLoading] = useState(true);

  const paginate = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // useEffect(() =>  {
  //   actualRecipesPerPage.length? setLoading(false) : setLoading(true)
  // }, [actualRecipesPerPage])

  const handleSelect = (e) => {
    e.preventDefault();
    const value = e.target.value;

    switch (value) {
      case "asc":
        return dispatch(orderByName("asc"));
      case "desc":
        return dispatch(orderByName("desc"));
      case "s+":
        return dispatch(orderByScore("s+"));
      case "s-":
        return dispatch(orderByScore("s-"));
      default:
        return dispatch(filterPerDiets(value));
    }
  };

  return (
    <div>
      <div className="searchbar__container">
        <div className="searchbar__select-container">
          <Ordening dietsAll={dietsAll} handleSelect={handleSelect} />
          <Filter dietsAll={dietsAll} handleSelect={handleSelect} />
        </div>

        <SearchBar />
      </div>

      {!actualRecipesPerPage.length ? (
        <Loader />
      ) : (
        <div className="cards__container">
          {actualRecipesPerPage?.map((el,i) => (
            <div className="cards__container-card" key={i}>
              <Link key={el.id} to={`/home/${el.id}`}>
                <Recipe
                  name={el.name}
                  id={el.id}
                  diets={el.diets}
                  img={el.img}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      <Paginated
        paginate={paginate}
        recipesAll={recipesAll.length}
        recipesPerPage={recipesPerPage}
      />
    </div>
  );
}
