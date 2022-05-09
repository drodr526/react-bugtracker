import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sidebar(props){

    const navigate = useNavigate();
    
    const logout = () => {
        axios.get("http://localhost:4000/logout",
            { withCredentials: true })
            .then((res)=>{
                if(res.data == ""){
                    navigate("/login");
                }
            })
            .catch(()=>console.log("Error logging out"));
    }

    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" style={{width: "280px", height:"100vh"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                    <span className="fs-4">Welcome, {props.userData && props.userData.firstName}</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/dashboard" className="nav-link text-white" aria-current="page">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/submit" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                            Submit a ticket
                        </a>
                    </li>
                    <li>
                        <a href="/team" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                            Your team
                        </a>
                    </li>
                </ul>
                <hr />
                <div>
                    <button className="logout btn btn-secondary" onClick={logout}>Log out</button>
                </div>
            </div>
    )
}

export default Sidebar;