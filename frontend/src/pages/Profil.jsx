import React from 'react';
import Log from '../components/Log';
import UpdateProfil from '../components/UpdateProfil';
const token = localStorage.getItem("token")


const Profil = () => {
    return (
        <div className="profil-page">
        {token ? (
            <UpdateProfil/>
        ): (
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

export default Profil;