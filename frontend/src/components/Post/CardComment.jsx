//Imports
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { dateParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const CardComment = ({ post, users }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");
  const getComments = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/comment/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setComments(res.data.comments);        
        console.log(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(post.id);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comment/new`,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        content,
        messageId: post.id,
      },
    })
      .then((res) => {
        getComments();
        setContent("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="comments-container">
      {comments &&
        comments.map((comment) => {
          if (comment.MessageId === post.id)
            return (
              <div className="comment-container" key={comment.id}>
                <>
                  <div className="left-part" >
                    {users &&
                      users.map((user) => {
                        if (user.id === comment.UserId)
                          return <img src={user.picture} alt="" key={user.picture} />;
                        else return null;
                      })}
                  </div>
                  <div className="right-part" key={comment.MessageId}>
                    <div className="comment-header" key={comment.content}>
                      {users &&
                        users.map((user) => {
                          if (user.id === comment.UserId)
                            return (
                              <>
                                <h3 key={user.nom}>
                                  {user.prenom} {user.nom}
                                </h3>
                                <span>{dateParser(comment.createdAt)}</span>
                              </>
                            );
                          else return null;
                        })}
                    </div>
                    <p> {comment.content} </p>
                    <EditDeleteComment
                      comment={comment}
                      post={post}
                      users={users}
                      getcomments={getComments}
                      key={`${comment.id}-${comment.UserId}`}

                    ></EditDeleteComment>
                  </div>
                </>
              </div>
            );
          else return null;
        })}

      {userId && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name=""
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Laisser un commentaire !"
          />
          <input type="submit" value="Envoyer" id={post.id} />
        </form>
      )}
    </div>
  );
};

export default CardComment;
