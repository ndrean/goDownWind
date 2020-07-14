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
  const [picture, setPicture] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const [participants, setParticipants] = React.useState([]);

  // api/v1/events/{indexEdit} to set PATCH or POST if not exist
  const [indexEdit, setIndexEdit] = React.useState(null);
  // Modal opened/closed
  const [show, setShow] = React.useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    // close Modal & reset form
    setShow(false);
    setItinary({ date: "", start: "", end: "" });
    setParticipants([]);
    setPreview("");
    setIndexEdit("");
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
        }); // then new updated rows
        if (query.ok) {
          setEvents((prev) => [...prev].filter((ev) => ev.id !== event.id));
        } else {
          throw new Error("unauthorized");
        }
      } catch (err) {
        alert("Not authorized");
      }
    }
  };

  // POST or PATCH the modal form:
  // the backend should send a mail on POST to every participant
  async function handleFormSubmit(e) {
    e.preventDefault();
    // adding boolean  field for notified? to participant
    let members = [];
    if (participants) {
      members = participants.map((p) => {
        if (!p.hasOwnProperty("email")) {
          return { email: p, notif: false };
        } else {
          return p;
        }
      });
    }

    const formdata = new FormData();
    /* => object formdata to pass to the backend
    {event: {
      itinary_attributes:{date:xxx, start:xxx, end:xxx},
      participants:[{email:xxx,notif:bool}, {...}],
      photo : "http://res.cloudinary.com/xxx"
    */
    for (const key in itinary) {
      formdata.append(`event[itinary_attributes][${key}]`, itinary[key]);
    }

    if (members.length > 0) {
      members.forEach((member) => {
        for (const key in member) {
          formdata.append(`event[participants][][${key}]`, member[key]);
        }
      });
    } else {
      formdata.append(`event[participants][]`, []);
    }

    if (picture) {
      formdata.append("event[photo]", picture);
    }

    if (!indexEdit) {
      setEvents(
        await fetchMethod({
          method: "POST",
          index: "",
          body: formdata,
        })
      );
    }
    if (indexEdit) {
      setEvents(
        await fetchMethod({
          method: "PATCH",
          index: indexEdit,
          body: formdata,
        })
      );
    }
    //reset
    setIndexEdit(null);
    setPreview("");
    handleClose(); // close Modal
  }

  // Edit event
  async function handleEdit(event) {
    setIndexEdit(event.id); // get /api/v1/events/ID

    const data = events.find((ev) => ev.id === event.id);
    setItinary({
      date: new Date(data.itinary.date).toISOString().slice(0, 10),
      start: data.itinary.start,
      end: data.itinary.end,
    });

    setParticipants(data.participants || []);

    if (event.url) {
      setPreview(event.url);
    }

    // if (data.participants) {
    //   console.log(data.participants);
    //   // const kiters = data.participants.map((p) => {
    //   //   return { email: p.email, notif: JSON.parse(p.notif) }; // === "true" ? true : false }; // false => p.notif
    //   // });
    //   setParticipants(
    //     data.participants.map((p) => {
    //       return { email: p.email, notif: JSON.parse(p.notif) };
    //     })
    //   );
    //setParticipants(kiters);
    // } else setParticipants([]);
    handleShow(); // open modal-form
  }

  function handleSelectChange(selectedOptions) {
    if (selectedOptions) {
      const kiters = [];
      selectedOptions.forEach((selOpt) => {
        const participant = participants.find((p) => p.email === selOpt.value);
        if (participant) {
          return kiters.push({ email: selOpt.value, notif: participant.notif });
        } else {
          return kiters.push({ email: selOpt.value, notif: false });
        }
      });
      setParticipants(kiters);
    } else setParticipants([]);
  }

  // update dynamically key/value for date, start, end of itinary
  function handleItinaryChange(e) {
    setItinary({
      ...itinary,
      [e.target.name]: e.target.value,
    });
  }

  // get photo
  async function handlePhoto(e) {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setPicture(e.target.files[0]);
    }
  }

  // update state & db on notification checkbox per event per participant
  function handleNotif(e, event) {
    event.participants[e.target.name].notif = e.target.checked;
    //setParticipants(event.participants);
    const items = [...events];
    const idx = items.findIndex((item) => item.id === event.id);
    items[idx] = event;
    setEvents(items);

    const formdata = new FormData();
    for (const key in event.itinary) {
      formdata.append(`event[itinary_attributes][${key}]`, event.itinary[key]);
    }
    event.participants.forEach((member) => {
      for (const key in member) {
        formdata.append(`event[participants][][${key}]`, member[key]);
      }
    });
    fetchMethod({ method: "PATCH", index: event.id, body: formdata });
  }

  // push notification to selected participants on button
  function handleSend(event) {
    if (event.participants.find((p) => p.notif)) {
      const listPush = event.participants
        .filter((p) => JSON.parse(p.notif))
        .map((p) => p.email);
      if (
        confirm(
          `Confirm to send notifications for the event ${event.itinary.date}, from ${event.itinary.start} to ${event.itinary.end}. Send to: ${listPush}`
        )
      ) {
        handleClose();
        console.log("PUSH PUSH", listPush);
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
              preview={preview}
              onFormSubmit={handleFormSubmit}
              onhandleItinaryChange={handleItinaryChange}
              onSelectChange={handleSelectChange}
              onhandlePhoto={handlePhoto}
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
                  //notify={notify}
                  onhandleRemove={(e) => handleRemove(e, event)}
                  onhandleEdit={() => handleEdit(event)}
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
