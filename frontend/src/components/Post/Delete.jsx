import axios from "axios";
import React from "react";
const token = localStorage.getItem("token")

const Delete = ({ post }) => {
    const deleteQuote = () => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/message/${post.id}`,
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then((res) => {
            window.location.reload()
            console.log(res)
        }).catch((err) => {
            console.log(err.response)
            console.log(post.id)
        });
    }
  return (
    <div
      onClick={() => {
        if (window.confirm("Veuillez vous supprimer ce message?")) {
          deleteQuote();
        }
      }}
    >
        <img src="../../images/trash.svg" alt="trash" />
    </div>
  );
};

export default Delete;
