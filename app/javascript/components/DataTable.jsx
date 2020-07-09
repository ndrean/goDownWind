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
  const [events, setEvents] = React.useState([]); // fetch from db
  const [users, setUsers] = React.useState([]); // fetch from db
  const [itinary, setItinary] = React.useState({
    date: "",
    start: "",
    end: "",
  });
  const [participants, setParticipants] = React.useState([]);
  // const [notify, setNotify] = React.useState(false);
  //const [values, setValues] = React.useState({ a: 1, b: 2 });

  // api/v1/events/{indexEdit} to set PATCH or POST if not exist
  const [indexEdit, setIndexEdit] = React.useState(null);

  // Modal opened/closed
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    // close Modal & reset form
    setShow(false);
    setItinary({ date: "", start: "", end: "" });
    setParticipants([]);
  };

  const increase = (key) => () => {
    setValues((values) => ({ ...values, [key]: values[key] + 1 }));
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

    //const c = increase("b");
    //console.log(c);
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
        }); // then new updated rows
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

  // POST or PATCH the modal form:
  // the backend should send a mail on POST to every participant
  async function handleFormSubmit(e) {
    e.preventDefault();
    const members = participants.map((p) => {
      return { email: p, notif: false };
    });
    console.log(members);
    const body = JSON.stringify({
      event: {
        itinary_attributes: {
          date: itinary.date,
          end: itinary.end,
          start: itinary.start,
        },
        participants: members,
      },
    });

    if (!indexEdit) {
      setEvents(await fetchMethod({ method: "POST", index: "", body: body }));
    } else if (indexEdit) {
      setEvents(
        await fetchMethod({ method: "PATCH", index: indexEdit, body: body })
      );
    }
    setIndexEdit(null); // reset index
    handleClose(); // close Modal
  }

  // Edit event
  async function handleEdit(e, event) {
    e.preventDefault();
    setIndexEdit(event.id); // get /api/v1/events/ID
    const data = events.find((ev) => ev.id === event.id);
    setItinary({
      date: new Date(data.itinary.date).toISOString().slice(0, 10),
      start: data.itinary.start,
      end: data.itinary.end,
    });
    const kiters = data.participants.map((p) => {
      return { email: p.email, notif: false };
    });
    setParticipants(kiters);
    handleShow(); // open modal-form
  }

  function handleSelectChange(selectedOptions) {
    if (selectedOptions) {
      const kiters = [];
      selectedOptions.forEach((selOpt) => kiters.push(selOpt.value));
      setParticipants(kiters);
    }
  }

  function handleItinaryChange(e) {
    setItinary({ ...itinary, [e.target.name]: e.target.value });
  }

  // update state & db on notification checkbox per event per participant
  function handleNotif(e, event) {
    event.participants[e.target.name].notif = e.target.checked;
    let items = [...events];
    let idx = items.findIndex((item) => item.id === event.id);
    items[idx] = event;
    setEvents(items);
    const body = JSON.stringify({
      event: {
        itinary_attributes: {
          date: event.itinary.date,
          end: event.itinary.end,
          start: event.itinary.start,
        },
        participants: event.participants,
      },
    });
    fetchMethod({ method: "PATCH", index: event.id, body: body });
  }

  // push notification to selected participants on button
  function handleSend(event) {
    if (event.participants.find((p) => p.notif)) {
      const listPush = event.participants
        .filter((p) => p.notif)
        .map((p) => p.email);
      if (
        confirm(
          `Confirm to send notifications for the event ${event.itinary.date}, from ${event.itinary.start} to ${event.itinary.end}. Send to: ${listPush}`
        )
      ) {
        handleClose();
        console.log("PUSH PUSH");
      }
    } else {
      alert("No one to invite!");
    }
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
              participants={participants}
              date={itinary.date}
              start={itinary.start}
              end={itinary.end}
              onFormSubmit={handleFormSubmit}
              onhandleItinaryChange={handleItinaryChange}
              onSelectChange={handleSelectChange}
            />
          </AddEventModal>
        </Row>
      </Container>
      <br />

      <Table bordered size="md" striped responsive="sm">
        <thead>
          <tr>
            <th>Event Owner</th>
            <th>Date</th>
            <th>Starting</th>
            <th>Notify</th>
            <th colSpan={2}></th>
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
                  onhandleNotif={(e) => handleNotif(e, event)}
                  onhandleSend={() => handleSend(event)}
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
