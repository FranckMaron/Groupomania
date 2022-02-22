//Imports
import React from "react";
import { useState } from "react";
import axios from "axios";

//Inscription
const SignUpForm = () => {
  //Initialisations des variables
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
    const terms = document.getElementById("terms");
    const termsError = document.querySelector(".terms.error");
    const passwordConfError = document.querySelector(".password-confirm.error");

    //Initialisation des champs erreur vide
    prenomError.innerHTML = "";
    nomError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    termsError.innerHTML = "";
    passwordConfError.innerHTML = "";

    //Gestion des erreur du aux conditions générale non coché || au mot de passe différents
    if (!terms.checked) {
      termsError.innerHTML = "Veuillez accepter les conditions générales !";
    }
    if (password !== controlPassword) {
      passwordConfError.innerHTML = "Les mot de passes ne correspondent pas !";
    }
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
        console.log(result);
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
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">J'accepte les conditions générales !</label>
      <div className="terms error"></div>
      <br />
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUpForm;
