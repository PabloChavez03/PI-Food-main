import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

import image from "./cooking.png"

const navLinks = [
  { name: "Intro", path: "/" },
  { name: "Home", path: "/home" },
  { name: "Create Recipe", path: "createrecipe" },
  { name: "About", path: "/about" },
];

export default function Layout() {
  return (
    <div>
      <div>
        <header className="layout__navbar-header">
          <div id="layout__title"><img src={image} alt="img not found"></img>Pi Food</div>
          <nav className="layout__navbar-header-nav">
            <ul>
              {navLinks?.map((el,i) => (
                <li key={i}>
                  <NavLink to={el.path} key={el.name}>
                    {el.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>

      <main className="layout__outlet-main">
        {/* renderiza el contenido de las rutas */}
        <Outlet />
      </main>
    </div>
  );
}
