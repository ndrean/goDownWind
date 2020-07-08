import fetchWithToken from "./fetchWithToken";
import { eventsEndPoint } from "../components/endpoints";

async function fetchMethod({ method, index, body }) {
  try {
    const query = await fetchWithToken(eventsEndPoint + index, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body,
    });
    if (query.ok) {
      console.log(method);
      const query = await fetch(eventsEndPoint);
      return await query.json();
    }
  } catch (err) {
    console.log(err);
  }
}

export default fetchMethod;
