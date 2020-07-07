import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddEventModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Define the event and invite kiters</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onhandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onhandleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
