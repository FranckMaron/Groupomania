import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
const token = localStorage.getItem("token");

const Thread = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/message/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMessages();
  }, []);

  return <div></div>;
};

export default Thread;
