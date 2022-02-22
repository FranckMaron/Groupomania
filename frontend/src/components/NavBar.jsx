import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../components/Log/Logout";
const token = localStorage.getItem("token");

const NavBar = () => {
  axios({});

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <img
            src="../images/icon-left-font-monochrome-black.svg"
            alt="Logo groupomania"
          />
        </div>
        {token ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue avec token </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="../images/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
