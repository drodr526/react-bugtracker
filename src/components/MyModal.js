import React, {useEffect, useState}from "react";
import {Modal, Button} from "react-bootstrap"

function MyModal(props) {

    return(
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">This will delete the ticket.</Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.deleteTicket}>
            Yes, delete ticket.
          </Button>
        </Modal.Footer>
      </Modal>)
}

export default MyModal;