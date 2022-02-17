import React from 'react';
// import { useState } from 'react';
// import SignUpForm from "./SignUpForm"
// import SignInForm from "./SignInForm"
import { NavLink } from 'react-router-dom';

const Connect = () => {
    // const [signUpModal, setSignUpModal] = useState(true)
    // const [signInModal, setSignInModal] = useState(false) 

    return (
        <div className="connection-form">
            <div className="form-container">
              
                    <NavLink>S'inscrire</NavLink>
                    <NavLink>Se connecter</NavLink>
          
                {/* {signUpModal && <SignUpForm/>}
                {signInModal && <SignInForm/>} */}
            </div>
        </div>
    );
};

export default Connect;