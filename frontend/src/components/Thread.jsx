//Imports
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Post/Card";
const token = localStorage.getItem("token");

const Thread = () => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    const getPost = async (num) => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/message/all`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          const array = res.data.messages;
          setMessages(array);
         
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getPost();
  }, []);

  return (
    <div className="thread-container">
      <ul>
        {messages &&
          messages.map((message) => {
            return <Card post={message} key={message.id} />;
          }).sort((a, b) => b.createdAt - a.createdAt)}
      </ul>
    </div>
  );
};

export default Thread;
