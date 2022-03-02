//Imports
import React from "react";
import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

//Inscription
const SignUpForm = () => {
  //Initialisations des variables
  const [formSubmit, setFormSubmit] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  //Envoi du formulaire
  const handleRegister = (e) => {
    e.preventDefault();
    //Récupération des élements dans le DOM
    const prenomError = document.querySelector(".prenom.error");
    const nomError = document.querySelector(".nom.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
  

    //Initialisation des champs erreur vide
    prenomError.innerHTML = "";
    nomError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
 
    //Appel a l'API
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: {
        prenom,
        nom,
        email,
        password,
      },
    })
      .then((result) => {
        //Confirmation de l'inscription en passant le state à true
        setFormSubmit(true);
      })
      .catch((err) => {
        //Affichage des différentes erreurs
        console.log(err.response);
        if (err.response.data.error.includes("nom")) {
          prenomError.innerHTML = err.response.data.error;
          nomError.innerHTML = err.response.data.error;
        }
        if (err.response.data.error.includes("Email")) {
          emailError.innerHTML = err.response.data.error;
        }
        if (err.response.data.error.includes("mot de passe")) {
          passwordError.innerHTML = err.response.data.error;
        }
      });
  };
  //Formulaire d'inscription
  return (
    //On vérifie si l'utilisateur s'est incrist(e)
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Inscription réussie veuillez vous connecter !
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            required
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />

          <div className="prenom error"></div>
          <br />
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            required
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />

          <div className="nom error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            required
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
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            required
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />

          <div className="password-confirm error"></div>
          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
