import React from "react";
// import Popover from "react-bootstrap/Popover";
// import PopoverContent from "react-bootstrap/PopoverContent";
// import PopoverTitle from "react-bootstrap/PopoverTitle";
// import OverlayTrigger from "react-bootstrap/Overlay";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

import { Details } from "./Details";

const TableRow = ({ event, onhandleRemove }) => {
  return (
    <tr key={event.id}>
      <td>{event.user.email}</td>
      <td>{event.itinary.date}</td>
      <td>{event.itinary.start}</td>
      <td>
        <Details event={event} />
      </td>
      <td>
        <Button onClick={onhandleRemove}>Delete</Button>
      </td>
      <td>Edit</td>
    </tr>
  );
};

export default TableRow;
