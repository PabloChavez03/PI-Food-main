import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { getRecipes } from "../../../redux/actions-creators";


export default function Home () {
  const dispatch = useDispatch();
  const recipesAll = useSelector(state => state.recipesAll);

  useEffect(()=>{
    dispatch(getRecipes());
  })

  return (
    <div>
      {
        recipesAll?.map(el => (
          <div>
            <h1>{el.id}</h1>
            <h1>{el.name}</h1>
          </div>
        ))
      }
    </div>
  )
}