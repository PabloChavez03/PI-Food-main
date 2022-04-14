import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByNameTwo } from "../../../redux/actions-creators";
// import { getRecipesByName } from "../../../redux/actions-creators";

import "./SearchBar.css"

export default function SearchBar ({getRecipesByName}) {

  const dispatch = useDispatch();
  const [input,setInput] = useState({
    name: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInput({
      name : value,
    })
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    // dispatch(getRecipesByName(input.name));
    dispatch(getRecipeByNameTwo(input.name)); //localhost:3001 => recipe?name=${name} 
    setInput({
      name: "",
    });
  };


  return (
    <div className="searchbar__container-name">
      <input onChange={handleOnChange} type="text" value={input.name} placeholder="Search name"/>
      <button onClick={handleOnClick}>Search</button>
    </div>
  )
}