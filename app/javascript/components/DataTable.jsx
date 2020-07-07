import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TableRow from "./TableRow";
import AddEventModal from "./AddEventModal";
import AddEventForm from "./AddEventForm";

import fetchWithToken from "../packs/fetchWithToken";

// import { render } from "react-dom";

const DataTable = () => {
  const [events, setEvents] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [participants, setParticipants] = React.useState([]);
  const [indexEdit, setIndexEdit] = React.useState(null);

  const [show, setShow] = React.useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setDate("");
    setStart("");
    setEnd("");
    setParticipants("");
  };

  const eventsEndPoint = "http://localhost:3000/api/v1/events/";
  const usersEndPoint = "http://localhost:3000/api/v1/users/";

  React.useEffect(() => {
    fetch(eventsEndPoint)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));

    fetch(usersEndPoint)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleRemove = async (e, event) => {
    e.preventDefault();
    if (confirm("Confirm removal?")) {
      try {
        const query = await fetchWithToken(eventsEndPoint + event.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (query.ok) {
          setEvents((prev) => [...prev].filter((ev) => ev.id !== event.id));
          // const events = await fetch("http://localhost:3000/api/v1/events/");
          // const data = await events.json();
          // setEvents(data);
        } else {
          throw new Error("unauthorized");
        }
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      event: {
        itinary_attributes: { date: date, end: end, start: start },
        participants: participants,
      },
    });
    if (!indexEdit) {
      try {
        const queryPost = await fetchWithToken(eventsEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: body,
        });
        if (queryPost.ok) {
          console.log("post");
          const query = await fetch(eventsEndPoint);
          const data = await query.json();
          setEvents(data);
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    } else if (indexEdit) {
      try {
        const queryPatch = await fetchWithToken(eventsEndPoint + indexEdit, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: body,
        });
        if (queryPatch.ok) {
          console.log("patch");
          const query = await fetch(eventsEndPoint);
          const data = await query.json();
          setEvents(data);
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIndexEdit(null);
    handleClose();
  }

  async function handleEdit(e, event) {
    e.preventDefault();
    // const query = await fetch(eventsEndPoint + event.id);
    // const data = await query.json();
    const data = events.find((ev) => ev.id === event.id);
    setDate(new Date(data.itinary.date).toISOString().slice(0, 10));
    setStart(data.itinary.start);
    setEnd(data.itinary.end);
    setParticipants(data.participants);
    setIndexEdit(event.id);
    handleShow();
  }

  return (
    <>
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Button
            variant="outline-dark"
            onClick={handleShow}
            style={{ fontSize: "30px" }}
          >
            <FontAwesomeIcon icon="check" /> <span> Create an event</span>
          </Button>
          <AddEventModal show={show} onhandleClose={handleClose}>
            <AddEventForm
              users={users}
              date={date}
              start={start}
              end={end}
              participants={participants}
              onFormSubmit={handleFormSubmit}
              onDateChange={(e) => setDate(e.target.value)}
              onStartChange={(e) => setStart(e.target.value)}
              onEndChange={(e) => setEnd(e.target.value)}
              onSelectChange={(e) => {
                setParticipants(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                );
              }}
            />
          </AddEventModal>
        </Row>
      </Container>
      <br />

      <Table
        bordered
        size="md"
        striped
        responsive="sm"
        style={{ height: "60vh", overflowY: scroll }}
      >
        <thead>
          <tr>
            <th>Event Owner</th>
            <th>Date</th>
            <th>Starting</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {!events
            ? null
            : events.map((event) => (
                <TableRow
                  key={event.id}
                  event={event}
                  onhandleRemove={(e) => handleRemove(e, event)}
                  onhandleEdit={(e) => handleEdit(e, event)}
                />
              ))}
        </tbody>
      </Table>
    </>
  );
};

export { DataTable };

{
  /* https://stackoverflow.com/questions/39914455/react-validatedomnesting-text-cannot-appear-as-a-child-of-tr/39915085 */
}
