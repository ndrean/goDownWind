import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AddEventModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Define the event and invite kiters</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={props.onhandleClose}>
            Close
          </Button>
          {/* <Button disabled variant="primary" onClick={props.onhandleChanges}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
