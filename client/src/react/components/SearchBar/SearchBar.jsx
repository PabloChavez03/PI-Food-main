import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../../redux/actions-creators";

export default function SearchBar () {

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
    dispatch(getRecipesByName(input.name));
    setInput({
      name: "",
    });
  };


  return (
    <div>
      <input onChange={handleOnChange} type="text" value={input.name} placeholder="Search name"/>
      <button onClick={handleOnClick}>Search</button>
    </div>
  )
}