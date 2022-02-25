//Imports
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Error from "./pages/Error";

//App router
const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
