import React from "react";
import Table from "react-bootstrap/Table";

import { Row } from "./Row";

import { fetchWithToken } from "../packs/fetchWithToken";

// import { render } from "react-dom";

const DataTable = () => {
  const [events, setEvents] = React.useState("");
  const endpoint = "http://localhost:3000/api/v1/events/";
  React.useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  const handleRemove = (e, event) => {
    e.preventDefault();
    if (confirm("Confirm removal?")) {
      //console.log("remove", event);
      fetchWithToken(`http://localhost:3000/api/v1/events/${event.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        // .then(() => {
        //   fetch(endpoint)
        //     .then((result) => result.json())
        //     .then((data) => setEvents(data))
        //     .catch((err) => console.log("Fetch pb", err));
        // })
        .catch((err) => console.log("Error:", err));
    }
  };
  return (
    <Table bordered size="md" striped responsive="sm" className="scrolling-y">
      <thead>
        <tr>
          <th>Owner</th>
          <th>Date</th>
          <th>Starting</th>
          <th>Details</th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {!events
          ? null
          : events.map((event) => (
              <Row
                key={event.id}
                event={event}
                onhandleRemove={(e) => handleRemove(e, event)}
              />
            ))}
      </tbody>
    </Table>
  );
};

export { DataTable };

{
  /* https://stackoverflow.com/questions/39914455/react-validatedomnesting-text-cannot-appear-as-a-child-of-tr/39915085 */
}
