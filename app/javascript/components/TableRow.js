import React from "react";

// import Popover from "react-bootstrap/Popover";
// import PopoverContent from "react-bootstrap/PopoverContent";
// import PopoverTitle from "react-bootstrap/PopoverTitle";
// import OverlayTrigger from "react-bootstrap/Overlay";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Modal from "react-bootstrap/Modal";

import { Details } from "./Details";

const TableRow = ({ event, onhandleRemove, onhandleEdit }) => {
  return (
    <tr key={event.id}>
      <td>{event.user.email}</td>
      <td>{event.itinary.date}</td>
      <td>{event.itinary.start}</td>
      <td>
        <Details event={event} />
      </td>
      <td>
        <Button
          variant="outline-danger"
          onClick={onhandleRemove}
          style={{ fontSize: "12px" }}
        >
          <FontAwesomeIcon icon="trash" size="2x" />
        </Button>
      </td>
      <td>
        <Button
          variant="outline-dark"
          onClick={onhandleEdit}
          style={{ fontSize: "12px" }}
        >
          <FontAwesomeIcon icon="edit" size="2x" />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
