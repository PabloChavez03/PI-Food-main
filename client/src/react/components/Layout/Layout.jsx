import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

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
          <div id="layout__title">Pi Food</div>
          <nav className="layout__navbar-header-nav">
            <ul>
              {navLinks?.map((el) => (
                <li>
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
