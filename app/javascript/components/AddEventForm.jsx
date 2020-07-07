import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddEventForm = (props) => {
  const {
    users,
    date,
    start,
    end,
    onFormSubmit,
    onDateChange,
    onStartChange,
    onEndChange,
    onSelectChange,
  } = props;
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Form.Group controlId="ControlDate">
          <Form.Label>Date event</Form.Label>
          <Form.Control type="date" value={date} onChange={onDateChange} />
        </Form.Group>

        <Form.Group controlId="ControlStart">
          <Form.Label>Start place</Form.Label>
          <Form.Control type="text" value={start} onChange={onStartChange} />
        </Form.Group>

        <Form.Group controlId="ControlEnd">
          <Form.Label>End place</Form.Label>
          <Form.Control type="text" value={end} onChange={onEndChange} />
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddEventForm;
