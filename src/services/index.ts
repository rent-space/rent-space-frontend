const API_BASE_URL = process.env.APPLICATION_BASE_URL;
type REQUEST_TYPE = "GET" | "POST" | "UPDATE";

const callApi = async (url: string, body?: any, requestType: REQUEST_TYPE = "GET") => {
  try {
    const res = await fetch(API_BASE_URL + url, {
      method: requestType,
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default callApi;