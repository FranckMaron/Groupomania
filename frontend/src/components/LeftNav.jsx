import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {

    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/"  id='home'>
                        <img src="../images/home.svg" alt="" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;