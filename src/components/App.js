import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import Register from "./Register"
import Home from "./Home"

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
