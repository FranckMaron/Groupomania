//Imports
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Post/Card";
const token = localStorage.getItem("token");

const Thread = () => {
  const [messages, setMessages] = useState();
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(2);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
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
          if (loadPost) {
            const array = res.data.messages.slice(0, num);
            setMessages(array);
            setLoadPost(false);
            setCount(count + 1);
          }
          window.addEventListener("scroll", loadMore);
          return () => window.removeEventListener("scroll");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPost(count);
  }, [count, loadPost]);

  return (
    <div className="thread-container">
      <ul>
        {messages &&
          messages.map((message) => {
            return <Card post={message} key={message.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
