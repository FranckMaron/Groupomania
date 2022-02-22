import React from "react";
import Log from "../components/Log";

const Home = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log signin={false} signup={true}/>
        <div className="img-container">
          <img src="../images/icon-above-font.svg" alt="logo groupomania" />
        </div>
      </div>
    </div>
  );
};

export default Home;
