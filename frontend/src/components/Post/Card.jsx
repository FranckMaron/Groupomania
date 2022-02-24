//Imports
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { dateParser } from "../Utils";
const token = localStorage.getItem("token");

const Card = ({ post }) => {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <li className="card-container">
      <>
        <div className="card-left">
          <img
            src={
              users &&
              users
                .map((user) => {
                  if (user.id === post.UserId) return user.picture;
                  return null;
                })
                .join("")
            }
            alt=""
          />
        </div>
        <div className="card-right">
          <div className="card-header">
            <div className="pseudo">
              <h3>
                {users &&
                  users.map((user) => {
                    if (user.id === post.UserId)
                      return (
                        <p key={user.id}>
                          {user.prenom} {user.nom}
                        </p>
                      );
                    return null;
                  })}
              </h3>
            </div>
            <span>{dateParser(post.createdAt)} </span>
          </div>
          <p> {post.content} </p>
          {post.attachment && (
            <img src={post.attachment} alt="card-pic" className="card-pic" />
          )}
          <div className="card-footer">
            <div className="comment-icon">
              <img src="../../images/message1.svg" alt="" />
              <span></span>
            </div>
            <img src="../../images/heart.svg" alt="" />
            <img src="../../images/share.svg" alt="" />
          </div>
        </div>
      </>
    </li>
  );
};

export default Card;
