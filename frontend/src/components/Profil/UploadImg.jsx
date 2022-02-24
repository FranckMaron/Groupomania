import axios from "axios";
import React from "react";
import { useState } from "react";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const UploadImg = ({ user }) => {
  const [file, setFile] = useState("");
  const handlePicture = async (e) => {
    e.preventDefault();
    
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
