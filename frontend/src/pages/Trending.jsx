import React from "react";
import Log from "../components/Log";


const token = localStorage.getItem("token");

const Fil = () => {
  return (
    <div className="home">
      {token ? (
        <div className="main">
    
          
        </div>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="../images/icon-above-font.svg" alt="logo groupomania" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Fil;
