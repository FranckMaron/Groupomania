//Imports
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dateParser } from "../Utils";
import CardComment from "./CardComment";
import Delete from "./Delete";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const admin = localStorage.getItem("isAdmin")

const Card = ({ post, getpost }) => {
  const [users, setUsers] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [content, setContent] = useState(null);
  const [showComment, setShowComment] = useState(false);

  const updatePost = async () => {
      console.log(post);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/message/${post.id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        content,
      },
    })
      .then((res) => {
       getpost()
       setIsUpdated(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          {isUpdated === false && <p> {post.content} </p>}
          {isUpdated && (
            <div className="update-post">
              <textarea
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="button-container">
                <button className="btn" onClick={updatePost}>
                  Valider modifications
                </button>
              </div>
            </div>
          )}
          {post.attachment && (
            <img src={post.attachment} alt="card-pic" className="card-pic" />
          )}

          {(parseInt(userId) === post.UserId || admin === "true") &&  (
            <div className="button-container">
              <div onClick={() => setIsUpdated(!isUpdated)}>
                <img src="../../images/edit.svg" alt="edit" />
              </div>
              <Delete post={post} id={post.id} />
            </div>
          )}

          <div className="card-footer">
            <div className="comment-icon">
              <img
                onClick={() => setShowComment(!showComment)}
                src="../../images/message1.svg"
                alt=""
              />
              <span></span>
            </div>
            <img src="../../images/heart.svg" alt="" />
            <img src="../../images/share.svg" alt="" />
          </div>
          {showComment && (
            <CardComment post={post} getpost={getpost} users={users} />
          )}
        </div>
      </>
    </li>
  );
};

export default Card;
