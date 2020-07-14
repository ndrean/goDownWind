import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddEventForm = (props) => {
  const {
    users,
    participants,
    date,
    start,
    end,
    preview,
    onFormSubmit,
    onhandleItinaryChange,
    onSelectChange,
    onhandlePhoto,
  } = props;

  // setup SELECT
  const options = [],
    defaultOpt = [];
  users.forEach((u) => options.push({ value: u.email, label: u.email }));
  if (participants) {
    participants.forEach((p) =>
      defaultOpt.push({ value: p.email, label: p.email })
    );
  }

  return (
    <>
      <Form onSubmit={onFormSubmit} id="eventForm">
        <Form.Group controlId="ControlDate">
          <Form.Label>Date event</Form.Label>
          <Form.Control
            type="date"
            value={date}
            name="date"
            required
            onChange={onhandleItinaryChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlStart">
          <Form.Label>Start place</Form.Label>
          <Form.Control
            type="text"
            value={start}
            required
            name="start"
            onChange={onhandleItinaryChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlEnd">
          <Form.Label>End place</Form.Label>
          <Form.Control
            type="text"
            value={end}
            required
            name="end"
            onChange={onhandleItinaryChange}
          />
        </Form.Group>
        <Form.Group controlId="ControlKiters">
          <Form.Label>Invite participants</Form.Label>
          <Select
            defaultValue={defaultOpt}
            isMulti
            name="participants"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onSelectChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon="camera" size="2x" />
          </Form.Label>
          <Form.File
            type="file"
            name="photo"
            onChange={onhandlePhoto}
            accept="image/*"
          />
        </Form.Group>

        <Form.Group controlId="ControlComment">
          <Form.Label>Comments</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Row style={{ justifyContent: "center" }}>
          <Button
            variant="outline-primary"
            type="submit"
            style={{ fontSize: "24px" }}
          >
            <FontAwesomeIcon icon="paper-plane" /> Submit
          </Button>
        </Row>
      </Form>

      <br />

      <Row className="justify-content-md-center">
        <Col xs={6} md="auto">
          {preview && (
            <Image
              src={preview}
              alt={start}
              style={{ width: "250" }}
              fluid
              loading="lazy"
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddEventForm;
