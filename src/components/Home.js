import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <button onClick={()=>navigate("/login")}>Log in</button>
            <button onClick={()=>navigate("/register")}>Register</button>
        </div>
    )
}

export default Home;