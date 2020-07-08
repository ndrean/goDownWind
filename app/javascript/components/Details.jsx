import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Details = ({ event, onhandleNotifChange, notified }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <FontAwesomeIcon icon="bell" size="2x" />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            From: {event.itinary.start} <br />
            To: {event.itinary.end} <br />
            Date: {event.itinary.date}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <hr />
          {!event.participants
            ? null
            : event.participants.map((participant, idx) => (
                <Container key={idx}>
                  <Row key={participant.id}>
                    <Col xs="8">{participant.email}</Col>
                    <Col xs="4">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          name="notify"
                          type="checkbox"
                          label="Notif?"
                          checked={notified}
                          onChange={onhandleNotifChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { Details };
