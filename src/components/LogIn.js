import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
    let [userEmail, setEmail] = useState("");
    let [userPassword, setPassword] = useState("");
    const [userData, setUserData] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:4000/login",
            { username: userEmail, password: userPassword },
            { withCredentials: true })
            .then((res) => console.log(res))
    }
    const getUser = () => {
        axios.get("http://localhost:4000/getuser",
            { withCredentials: true })
            .then((res) => setUserData(res.data));
    }
    const logout = () => {
        axios.get("http://localhost:4000/logout",
            { withCredentials: true })
            .then((res) => {
                console.log(res);
                setUserData(null);
            });
        window.location.reload(false);
    }

    return (
        <div className="signin-form container text-center col-lg-3">
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src="images/robot-logo.jpg" alt="" width="144" height="114" />
                <h1 className="h3 mb-3 fw-normal">Log In</h1>

                <div className="form-floating">
                    <input type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                        placeholder="name@example.com"
                        value={userEmail} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control"
                        placeholder="Password"
                        value={userPassword} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit" >Sign In
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
            </form>
            <button onClick={logout}>Log out</button>
            <button onClick={getUser}>Get User</button>
            {userData && <h1>{userData.username}</h1>}
        </div>
    )
}

export default LogIn;