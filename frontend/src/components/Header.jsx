import React from 'react';
// import logo from "../images/icon-left-font-monochrome-black.png"

const Header = () => {
    return (
        <div className='header'>
        <h1>Logo Groupomania</h1>
            {/* <img src={logo} alt="Logo groupomania" /> */}
            <div className='me'>
            <p>Bonjour Franck ! 🖐</p>
            <p>Image de profil</p>
            </div>
          
        </div>
    );
};

export default Header;