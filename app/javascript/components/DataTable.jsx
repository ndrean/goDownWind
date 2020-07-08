import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TableRow from "./TableRow";
import AddEventModal from "./AddEventModal";
import AddEventForm from "./AddEventForm";

// utilitaries for fetch (Rails token with @rails/ujs)
import fetchWithToken from "../packs/fetchWithToken"; // token for POST, PATCH, DELETE
import fetchMethod from "../packs/fetchMethod"; // returns data after PATCH or POST depending upon endpoint
import { eventsEndPoint, usersEndPoint } from "./endpoints"; // const endpoints

const DataTable = () => {
  // from db: events= [event:{user, itinary, participants}]
  const [events, setEvents] = React.useState(""); // fetch from db
  const [users, setUsers] = React.useState([]); // fetch from db
  const [itinary, setItinary] = React.useState({
    date: "",
    start: "",
    end: "",
  });
  const [participants, setParticipants] = React.useState([]);

  // api/v1/events/{indexEdit} to set PATCH or POST if not exist
  const [indexEdit, setIndexEdit] = React.useState(null);

  // Modal opened/closed
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    // close Modal & reset form
    setShow(false);
    setItinary({ date: "", start: "", end: "" });
    setParticipants("");
  };

  // upload db
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

  // remove row from table
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
        } else {
          throw new Error("unauthorized");
        }
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  // POST or PATCH the modal form
  async function handleFormSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      event: {
        itinary_attributes: {
          date: itinary.date,
          end: itinary.end,
          start: itinary.start,
        },
        participants: participants,
      },
    });
    if (!indexEdit) {
      setEvents(await fetchMethod({ method: "POST", index: "", body: body }));
    } else if (indexEdit) {
      setEvents(
        await fetchMethod({ method: "PATCH", index: indexEdit, body: body })
      );
    }
    setIndexEdit(null);
    handleClose();
  }

  async function handleEdit(e, event) {
    e.preventDefault();
    setIndexEdit(event.id); // get /api/v1/events/ID
    const data = events.find((ev) => ev.id === event.id);
    setItinary({
      date: new Date(data.itinary.date).toISOString().slice(0, 10),
      start: data.itinary.start,
      end: data.itinary.end,
    });
    setParticipants(data.participants);
    handleShow();
  }

  function handleItinaryChange(e) {
    setItinary({ ...itinary, [e.target.name]: e.target.value });
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
              date={itinary.date}
              start={itinary.start}
              end={itinary.end}
              participants={participants}
              onFormSubmit={handleFormSubmit}
              onhandleItinaryChange={handleItinaryChange}
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
