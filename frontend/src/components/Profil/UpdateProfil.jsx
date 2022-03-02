//Imports
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";
import LeftNav from "../LeftNav";
const token = localStorage.getItem("token");

//Modification du profil
const UpdateProfil = () => {
  //Déclarations des variables néscessaires
  const [user, setUser] = useState([]);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userId = localStorage.getItem("userId");

  //Récupération de l'utilisateur
  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  //Mise à jour de la bio
  const handleUpdate = async (e) => {
    await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      data: {
        bio,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setUpdateForm(false);
        setBio(bio);
        getUser()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //Suppression du compte
  const handleDeleteUser = () => {
    const userId = localStorage.getItem("userId");
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        window.location = "/";
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>
        {user.prenom} {user.nom}
      </h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={user.picture} alt={"Photo de " + user.prenom} />
          <UploadImg user={user} />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  id="bio"
                  name="bio"
                  defaultValue={user.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification(s)</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(user.createdAt)}</h4>
          <button onClick={handleDeleteUser}> Supprimer le compte</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
