import React from "react";
import { useEffect } from "react";

import "./Paginated.css"

export default function Paginated ({recipesPerPage, recipesAll, paginate}) {
  const numbersPaginated = [];

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[paginate])


  for (let i = 0; i <= Math.ceil(recipesAll / recipesPerPage) - 1; i++) {
    numbersPaginated.push(i+1);    
  };

  return(
    <nav className="paginated__container">
      <ul className="paginated__container-ul">
        {
          numbersPaginated?.map(numberPage => (
            <li className="paginated__container-li" key={numberPage}>
              <a id="paginated__container-number" href={"#!"} onClick={() => paginate(numberPage)}>{numberPage}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}