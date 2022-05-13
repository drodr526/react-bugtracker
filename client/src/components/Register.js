import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Register() {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userEmail, setEmail] = useState("");
    let [userPassword, setPassword] = useState("");
    let [resData, setResData] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/register",
            { firstName: firstName, lastName:lastName, username: userEmail, password: userPassword },
            { withCredentials: true })
            .then((res) => {
                if(res.data == "User created"){
                    navigate("/login")
                }
                setResData(res)
            })
    }

    return (
            <div className="signin-form container text-center col-lg-3">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src="images/bug.png" alt="" width="144" height="144" />
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

                    <div className="form-floating">
                        <input type="text" 
                        onChange={(event)=>setFirstName(event.target.value)}
                        className="form-control bg-dark text-white" 
                        placeholder="John" 
                        value={firstName}/>
                        <label htmlFor="floatingInput">First Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" 
                        onChange={(event)=>setLastName(event.target.value)}
                        className="form-control bg-dark text-white" 
                        placeholder="Smith" 
                        value={lastName}/>
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" 
                        onChange={(event)=>setEmail(event.target.value)}
                        className="form-control bg-dark text-white" 
                        placeholder="name@example.com" 
                        value={userEmail}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" 
                        onChange={(event)=>setPassword(event.target.value)} 
                        className="form-control bg-dark text-white" 
                        placeholder="Password" 
                        value={userPassword}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button 
                    className="w-100 btn btn-lg btn-primary" 
                    type="submit" >Register
                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                </form>

                {resData && <h1>{resData.data}</h1>}
            </div>
    )
}

export default Register;