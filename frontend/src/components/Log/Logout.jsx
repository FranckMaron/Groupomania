//Imports
import React from "react";

//Deconnexion
const Logout = () => {
  const logout = (e) => {
    localStorage.removeItem("token");
    window.location.href = "/";
    console.log(localStorage.getItem("token"));
  };

  return (
    <li onClick={logout}>
      <img src="../images/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
