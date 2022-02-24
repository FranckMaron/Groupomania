//Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/"  className={(nav) => nav.isActive ? "active-left-nav" : null}>
                        <img src="./images/home.svg" alt="logo home" />
                    </NavLink>
                    <br />
                    <NavLink to="/profil"  className={(nav) => nav.isActive ? "active-left-nav" : null}>
                        <img src="./images/user.svg" alt="logo home" />
                    </NavLink>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default LeftNav;