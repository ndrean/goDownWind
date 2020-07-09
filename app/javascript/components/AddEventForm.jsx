import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddEventForm = (props) => {
  const {
    users,
    participants,
    date,
    start,
    end,
    onFormSubmit,
    onhandleItinaryChange,
    onSelectChange,
  } = props;

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
      <Form onSubmit={onFormSubmit}>
        <Form.Group controlId="ControlDate">
          <Form.Label>Date event</Form.Label>
          <Form.Control
            type="date"
            value={date}
            name="date"
            onChange={onhandleItinaryChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlStart">
          <Form.Label>Start place</Form.Label>
          <Form.Control
            type="text"
            value={start}
            name="start"
            onChange={onhandleItinaryChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlEnd">
          <Form.Label>End place</Form.Label>
          <Form.Control
            type="text"
            value={end}
            name="end"
            onChange={onhandleItinaryChange}
          />
        </Form.Group>
        <Form.Group controlId="ControlKiters">
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

        {/* <Form.Group controlId="ControlKiters">
          <Form.Label>Invite kiters</Form.Label>
          <Form.Control
            as="select"
            multiple
            onChange={onSelectChange}
            defaultValue={participants}
          >
            {users.map((user) => {
              return (
                <option key={user.email} value={user.email}>
                  {user.email}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group> */}

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
    </>
  );
};

export default AddEventForm;
