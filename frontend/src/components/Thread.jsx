//Imports
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Post/Card";

//Logique Thread
const Thread = () => {
  const [messages, setMessages] = useState();

  const getPost = async (num) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/message/all`,
    })
      .then((res) => {
        const array = res.data.messages;
        setMessages(array.reverse());
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="thread-container">
      <ul>
        {messages &&
          messages
            .map((message) => {
              return <Card post={message} getpost={getPost} key={message.id} />;
            })
            .sort((a, b) => b.createdAt - a.createdAt)}
      </ul>
    </div>
  );
};

export default Thread;
