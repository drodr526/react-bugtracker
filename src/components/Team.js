import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"


function Team() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const [warning, setWarning] = useState("");

    useEffect(() => {
        checkIfLoggedIn();
        getAllUsers();
    }, []) //empty array param in useEffect makes it only run once!

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

    return (
        <div>
            <div className="user-list-container">
                <h1>Your team</h1>
                <hr />
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">E-mail Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => {
                            return (<tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                            </tr>
                            )


                        })}
                    </tbody>
                </table>

            </div>



            <Sidebar userData={userData} />
        </div>

    )
}

export default Team;