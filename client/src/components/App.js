import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import Register from "./Register"
import Home from "./Home"
import Dashboard from "./Dashboard";
import Submit from "./Submit"
import Team from "./Team"
import Bug from "./Bug"
import Error from "./Error"
import Edit from "./Edit"
import User from "./User"

function App() {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/submit" element={<Submit />}/>
      <Route path="/team" element={<Team/>}/>
      <Route path="/ticket/:id" element={<Bug/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/user/:id" element={<User/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
