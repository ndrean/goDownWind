import fetchWithToken from "./fetchWithToken";
import { eventsEndPoint } from "../components/endpoints";

async function fetchMethod({ method, index, body }) {
  try {
    const query = await fetchWithToken(eventsEndPoint + index, {
      method: method,
      body: body,
    });
    console.log(method);
    if (query.ok) {
      // const headers = { "Content-Type": "application/json", ...headers };
      const query = await fetch(eventsEndPoint); //, { headers });
      return await query.json();
    }
  } catch (err) {
    throw new Error(err);
    //console.log(err);
  }
}

export default fetchMethod;
