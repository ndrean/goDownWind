import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Details = ({ event }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Display
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            From: {event.itinary.start} to: {event.itinary.end}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {event.itinary.date}
          <hr />
          {!event.participants
            ? null
            : event.participants.map((kiter, idx) => <p key={idx}>{kiter}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { Details };
