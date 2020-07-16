// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
//require("@rails/activestorage").start();
require("channels");

//import * as ActiveStorage from 'activestorage'; // for .js.erb and direct upload client > cloud

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports for Bootstrap Modal
import JQuery from "jquery";
window.$ = window.JQuery = JQuery;

import "bootstrap";
import React from "react";
import { render } from "react-dom";

// fontawesome in React with < FontAwesomeIcon icon="trash"/>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faEdit,
  faInfoCircle,
  faPlusSquare,
  faCheck,
  faBell,
  faShare,
  faPaperPlane,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTrash,
  faEdit,
  faInfoCircle,
  faPlusSquare,
  faCheck,
  faBell,
  faShare,
  faPaperPlane,
  faCamera
);

import { DataTable } from "../components/DataTable";

// require("./hello_react");
// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("app");
  if (app) {
    render(<DataTable></DataTable>, app);
  }
});
