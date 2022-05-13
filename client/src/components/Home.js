import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    return(
        <div className="home-page">
            <img className="mb-4" src="images/bug.png" alt="" width="144" height="144" />
            <h1>BugBreakr</h1>
            <h2>Issue Tracker</h2>
            <br/>
            <button className="btn btn-primary" onClick={()=>navigate("/login")}>Log in</button>
            <button className="btn btn-secondary" onClick={()=>navigate("/register")}>Register</button>
        </div>
    )
}

export default Home;