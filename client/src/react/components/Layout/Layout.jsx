import React from "react";
import { Outlet,NavLink } from "react-router-dom";
import './Layout.css';

const navLinks = [
    {name: "Intro", path: "/"},
    {name: "Home", path: "/home"},
    {name: "Create Recipe", path: "createfood"},
    {name: "About", path: "/about"},
];

export default function Layout () {
  return (
    <div>

      <div>
        <header className="layout__navbar-header">
          {/* puedo poner un logo */}
          <nav className="layout__navbar-header-nav">
            <ul>
              {
                navLinks?.map(el => (
                  <li>
                    <NavLink to={el.path} key={el.name} id="layout__navbar-a">
                      {el.name}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </nav>
        </header>
      </div>

      <div>
        {/* renderiza el contenido de las rutas */}
        <Outlet/>
      </div>
    </div>
  );
}