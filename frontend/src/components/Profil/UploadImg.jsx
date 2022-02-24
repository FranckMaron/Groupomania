import axios from "axios";
import React from "react";
import { useState } from "react";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const UploadImg = (props) => {
  const [file, setFile] = useState();
  const handlePicture = (e) => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      data: {
        file
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
          console.log(file);
        console.log(res);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
