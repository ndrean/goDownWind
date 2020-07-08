import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const AddEventForm = (props) => {
  const {
    users,
    date,
    start,
    end,
    onFormSubmit,
    onhandleInputsChange,
    onSelectChange,
  } = props;
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Form.Group controlId="ControlDate">
          <Form.Label>Date event</Form.Label>
          <Form.Control
            type="date"
            value={date}
            name="date"
            onChange={onhandleInputsChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlStart">
          <Form.Label>Start place</Form.Label>
          <Form.Control
            type="text"
            value={start}
            name="start"
            onChange={onhandleInputsChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlEnd">
          <Form.Label>End place</Form.Label>
          <Form.Control
            type="text"
            value={end}
            name="end"
            onChange={onhandleInputsChange}
          />
        </Form.Group>

        <Form.Group controlId="ControlKiters">
          <Form.Label>Invite kiters</Form.Label>
          <Form.Control as="select" multiple onChange={onSelectChange}>
            {users.map((user) => {
              return (
                <option key={user.email} value={user.email}>
                  {user.email}
                </option>
              );
            })}
          </Form.Control>
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
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default AddEventForm;
