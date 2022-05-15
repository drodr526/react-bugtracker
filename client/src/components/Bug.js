import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar"
import MyModal from "./MyModal"

function Bug() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bugData, setBugData] = useState(null);
    const [warning, setWarning] = useState(null);
    const [comment, setComment] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        checkIfLoggedIn();
        getBug();
    }, []) //empty array param in useEffect makes it only run once!

    function checkIfLoggedIn() {
        axios.get("/api/getuser",
            { withCredentials: true })
            .then((res) => {
                if (res.data.username == null) {
                    navigate("/login")
                } else {
                    setUserData(res.data);
                    setIsAdmin(res.data.admin)
                }
            })
    }

    function getBug() {
        axios.get("/api/ticket/" + id,
            { withCredentials: true })
            .then((res) => {
                if (res.data.title)
                    setBugData(res.data)
                else
                    setWarning(res.data)
            })
    }

    const postComment = () => {
        axios.post("/api/comment/" + id,
            { comment: comment },
            { withCredentials: true })
            .then((res) => {
                if (res.status == 200) {
                    window.location.reload(false);
                }
            })
    }

    const deleteTicket = () => {
        axios.delete("/api/ticket/" + id,
            { withCredentials: true })
            .then((res) => {
                if (res.status == 200) {
                    navigate("/dashboard")
                }
            })
    }

    let isFirstDev = true
    return (
        <div>
            <Sidebar userData={userData} />
            <MyModal show={showModal} handleClose={() => setShowModal(false)} handleShow={() => setShowModal(true)} deleteTicket={deleteTicket} />
            <div className="singular-ticket-container">
                <h1>{warning}</h1>
                <h1>{bugData && bugData.title}</h1>
                <p style={{ color: "gray" }}>{bugData && bugData.timeSubmitted}</p>
                <p style={{ color: "#ad1341" }}>Team: {bugData && bugData.team.map((dev) => {
                    if (isFirstDev) {
                        isFirstDev = false
                        return (dev)
                    } else {
                        return (", " + dev)
                    }
                })}</p>
                <p>{bugData && bugData.description}</p>
                {isAdmin && <button type="button" className="btn btn-danger close-button" onClick={() => setShowModal(!showModal)}>Close ticket</button>}
                {isAdmin && <button type="button" className="btn btn-primary edit-button" onClick={() => navigate("/edit/" + id)}>Edit</button>}

                <div className="comments">
                    <h3>Comments</h3>
                    <div className="box-and-button">
                        <input
                            onChange={(event) => (setComment(event.target.value))}
                            value={comment}
                            className="form-control bg-dark text-white"
                            placeholder="Enter a comment..."
                        ></input>
                        <button type="button" className="btn btn-primary" onClick={postComment}>Post</button>
                    </div>
                    {bugData && bugData.comments.map((comment) =>
                        <p key={comment}><span style={{ color: "#ad1341" }}>{comment.name + ":"}</span> {comment.comment}</p>)}
                </div>
            </div>


        </div>

    )
}

export default Bug;