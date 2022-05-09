import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"


function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [allBugs, setAllBugs] = useState([]);

    const [warning, setWarning] = useState("");

    useEffect(() => {
        checkIfLoggedIn();
        getAllBugs();
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

    function getAllBugs() {
        axios.get("http://localhost:4000/get-all-bugs",
            { withCredentials: true })
            .then((res) => {
                if(res.data == "No bugs found"){
                    setWarning(res.data)
                }else{
                    setAllBugs(res.data)
                }
            })
    }

    return (
        <div>
            <div className="bugs-list-container">
                <h1>Your Dashboard</h1>
                <hr />
                <h1>{warning}</h1>
                <table className="table table-dark ticket-table">
                    <thead>
                        <tr>
                            <th scope="col" width="250">Ticket name</th>
                            <th scope="col" width="400">Description</th>
                            <th scope="col" width="250">Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBugs && allBugs.map((bug) => {
                            const shortTitle = bug.title.substring(0,35);
                            const shortDescription = bug.description.substring(0,70);
                            let shortNames = "";
                            
                            let isFirstDev = true;

                            bug.team.map((dev) =>{
                                if(isFirstDev){
                                    isFirstDev = false
                                    shortNames += dev;
                                }else{
                                    shortNames += ", " + dev;
                                }
                                
                            })

                            shortNames = shortNames.substring(0,35);

                            return (<tr key={bug._id} onClick={()=>navigate("/ticket/"+bug._id)}>
                                <td>{shortTitle}{shortTitle.length == 35 ? "..." : null}</td>
                                <td>{shortDescription}{shortDescription.length == 70 ? "..." : null}</td>
                                <td>{"(" + bug.team.length + ") "}{shortNames}{shortNames.length == 35 ? "..." : null}</td>
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

export default Dashboard;