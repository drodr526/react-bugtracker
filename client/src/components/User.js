import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar"
import { Button, Form } from "react-bootstrap";

function User() {
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [makeUserAdmin, setMakeUserAdmin] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        checkIfLoggedIn();
        getOneUser();
    }, []) //empty array param in useEffect makes it only run once!

    function checkIfLoggedIn() {
        axios.get("/getuser",
            { withCredentials: true })
            .then((res) => {
                if (res.data.username == null) {
                    navigate("/login")
                } else {
                    setUserData(res.data);
                }
            })
    }

    function getOneUser() {
        axios.get("/get-one-user/" + id,
            { withCredentials: true })
            .then((res) => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.username)
                setMakeUserAdmin(res.data.admin)
            })

    }

    function updateUser(){
        axios.put("/get-one-user/" + id,
        {firstName:firstName, lastName:lastName, email:email, admin:makeUserAdmin},
        {withCredentials:true})
        .then((res)=>{
            if(res.data.username){
                navigate("/team")
            }
        })
    }



    return (

        <div>
            {email ?
                <div>
                <div className="singular-user-container">
                    <h1>Edit a user</h1>
                    <label>First Name</label>
                    <input
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        className="form-control bg-dark text-white"></input>
                    <label>Last Name</label>
                    <input
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                        className="form-control bg-dark text-white"></input>
                    <label>E-mail Address</label>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        className="form-control bg-dark text-white"></input>
                    <label>Admin?</label>
                    <Form.Check onChange={(event)=>setMakeUserAdmin(event.target.checked)} checked={makeUserAdmin}/>
                    <Button onClick={()=>updateUser()}>Save Changes</Button>
                </div>
                
            </div> 
            : <h1 className="singular-user-container">No user found.</h1>
            }
            
            <Sidebar />
        </div>
    )

}

export default User;