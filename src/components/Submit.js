import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"


function Submit() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const [bugTitle, setBugTitle] = useState("");
    const [bugDescription, setBugDescription] = useState("");
    const [assignedDev, setAssignedDev] = useState(null);

    const [warning, setWarning] = useState("");

    function handleDropdownChange(event) {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setAssignedDev(value);
    }

    useEffect(() => {
        checkIfLoggedIn();
        getAllUsers();
    },[]) //empty array param in useEffect makes it only run once!

    function checkIfLoggedIn() {
        axios.get("http://localhost:4000/getuser",
            { withCredentials: true })
            .then((res) => {
                if (res.data.username == null) {
                    navigate("/login")
                } else {
                    setUserData(res.data);
                }
            })
    }

    function getAllUsers() {
        axios.get("http://localhost:4000/get-all-users",
            { withCredentials: true })
            .then((res) => {
                setAllUsers(res.data);
            })
    }

    const handleSubmit = () => {
        if (bugTitle == "" || bugDescription == "" || assignedDev == "") {
            setWarning("Please fill in all fields");
        } else {
            axios.post("http://localhost:4000/submit",
                { title: bugTitle, description: bugDescription, team: assignedDev },
                { withCredentials: true })
                .then((res)=>{
                    if(res.data == "Submitted successfully"){
                        navigate("/dashboard")
                    }
                })

        }
    }

    return (
        <div>
            <div className="submit-container form-group">
                <h1>Submit a ticket</h1>
                <input
                    onChange={(event) => (setBugTitle(event.target.value))}
                    value={bugTitle}
                    className="form-control bg-dark text-white"
                    placeholder="Bug title"
                ></input>
                <textarea className="form-control bg-dark text-white"
                    placeholder="Bug description"
                    rows="5"
                    onChange={(event) => setBugDescription(event.target.value)}
                    value={bugDescription}></textarea>

                <select
                    multiple
                    onChange={(event) => handleDropdownChange(event)}
                    className="form-control bg-dark text-white"
                    placeholder="select"
                    size={allUsers.length + 1}>
                    <option value="" disabled>Select a developer... (Ctrl to select multiple)</option>
                    {allUsers.map((user)=>
                        <option key={user._id}>{user.firstName + " " + user.lastName}</option>
                    )}
                </select>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            <Sidebar userData={userData} />
        </div>

    )
}

export default Submit;