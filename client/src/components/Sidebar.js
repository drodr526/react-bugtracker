import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Sidebar(props) {

    const navigate = useNavigate();

    const logout = () => {
        axios.get("/api/logout",
            { withCredentials: true })
            .then((res) => {
                if (res.data == "") {
                    navigate("/login");
                }
            })
            .catch(() => console.log("Error logging out"));
    }

    return (
        <div>
            <div className="hamburger-menu">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4">
                        <h5 className="text-white h4">Welcome, {props.userData && props.userData.firstName}</h5>
                        <p onClick={()=>navigate("/dashboard")} className="text-white">Dashboard</p>
                        <p onClick={()=>navigate("/submit")} className="text-white">Submit a ticket</p>
                        <p onClick={()=>navigate("/team")} className="text-white">Your team</p>
                    </div>
                </div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </div>

            <div className="sidebar">
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px", height: "100vh" }}>
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
            </div>
        </div>

    )
}

export default Sidebar;