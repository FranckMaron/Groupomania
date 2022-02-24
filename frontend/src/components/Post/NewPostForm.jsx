//Imports
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { timestampParser } from "../Utils";

const token = localStorage.getItem("token");


const NewPostForm = () => {
  const [user, setUser] = useState([]);
  const [postPicture, setPostPicture] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");

  
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

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = async () => {
      
        const formData = new FormData()
        formData.append("content", content)
        if (file) formData.append("file", file)
      
      await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/message/new`,
          headers: {
              Authorization: "Bearer " + token,
          },
          data: formData
      })
      .then((result) => {
          window.location.reload()
      }).catch((err) => {
          console.log(err)
      });
  };

  const cancelPost = () => {
    setContent("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      <>
        <div className="data">
          <p>
            <span></span>
            <span></span>
          </p>
        </div>
        <NavLink to="/">
          <div className="user-info">
            <img src={user.picture} alt="user-pic" />
          </div>
        </NavLink>
        <div className="post-form">
          <textarea
            name="content"
            id="message"
            placeholder="Quoi de neuf?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          {content || postPicture ? (
            <li className="card-container">
              <div className="card-left">
                <img src={user.picture} alt="user-pic" />
              </div>
              <div className="card-right">
                <div className="card-header">
                  <div className="pseudo">
                    <h3>
                      {user.prenom} {user.nom}
                    </h3>
                  </div>
                  <span> {timestampParser(Date.now())} </span>
                </div>
                <div className="content">
                  <p> {content} </p>
                  {postPicture ? <img src={postPicture} alt="" /> : null}
                </div>
              </div>
            </li>
          ) : null}

          <div className="footer-form">
            <div className="icon">
              <img src="../../images/picture.svg" alt="" />
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </div>
            <div className="btn-send">
              {content || postPicture ? (
                <button className="cancel" onClick={cancelPost}>
                  Annuler message
                </button>
              ) : null}

              <button className="send" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPostForm;
