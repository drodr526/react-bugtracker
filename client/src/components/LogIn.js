import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn(props) {
    let [userEmail, setEmail] = useState("");
    let [userPassword, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("/getuser",
            { withCredentials: true })
            .then((res)=>{
                if(res.data.username){
                    navigate("/dashboard")
                }
            })
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        //log in 
        axios.post("/login",
            { username: userEmail, password: userPassword },
            { withCredentials: true })
            .then((res) =>{
                if(res.data.username){
                    navigate("/dashboard")
                }
                else{
                    setErrorMessage(res.data);
                }
            })
    }

    return (
        <div className="signin-form container text-center col-lg-3">
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src="images/bug.png" alt="" width="144" height="144" />
                <h1 className="h3 mb-3 fw-normal">Log In</h1>

                <div className="form-floating">
                    <input type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control bg-dark text-white"
                        placeholder="name@example.com"
                        value={userEmail} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control bg-dark text-white"
                        placeholder="Password"
                        value={userPassword} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit" >Sign In
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
            </form>
            {errorMessage != "" ? <h1>{errorMessage}</h1> : null}
        </div>
    )
}

export default LogIn;