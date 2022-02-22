//Imports
import React from "react";
import axios from "axios";
import { useState } from "react";

//Connexion
const SignInForm = () => {
  //Initialisations des variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Envoi du formulaire
  const handleLogin = (e) => {
    e.preventDefault();
    //Récupération des élements dans le DOM
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    //Initialisation des champs erreur vide
    passwordError.innerHTML = "";
    emailError.innerHTML = "";

    //Appel à l'API
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        window.location.href = "/fil";
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      //Gestion des erreurs
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.error.includes("Email")) {
          emailError.innerHTML = err.response.data.error;
        } else if (err.response.data.error.includes("Mot de passe")) {
          passwordError.innerHTML = err.response.data.error;
        } else {
          console.log(err);
        }
      });
  };

  return (
    //Formulaire de connexion
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
