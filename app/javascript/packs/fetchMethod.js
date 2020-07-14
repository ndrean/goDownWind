import fetchWithToken from "./fetchWithToken";
import { eventsEndPoint } from "../components/endpoints";

async function fetchMethod({ method, index, body }) {
  try {
    const query = await fetchWithToken(eventsEndPoint + index, {
      method: method,
      body: body,
    });
    if (query.ok) {
      console.log(method);
      const query = await fetch(eventsEndPoint);
      const response = await query.json();
      console.log(response);
      return response; //await query.json();
    }
  } catch (err) {
    throw new Error(err);
    //console.log(err);
  }
}

export default fetchMethod;
