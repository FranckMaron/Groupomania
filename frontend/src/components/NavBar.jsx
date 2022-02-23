import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../components/Log/Logout";
const token = localStorage.getItem("token");

const NavBar = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
        <NavLink to="/fil">
          <img
            src="../images/icon-left-font-monochrome-black.svg"
            alt="Logo groupomania"
          />
          </NavLink>
        </div>

        {token ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue {user.prenom} </h5>
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
