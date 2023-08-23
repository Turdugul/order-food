import { BASE_URL } from "../utils/constants/general";

export const fetchRequest = async (url = "", options) => {
  try {
    const { method, body } = options || {};
    const requestOptions = {
      method: method || "GET",
      headers: {
        UserID: "Gul",
        "Content-Type": "application/json",
      },
    };
    if (method !== "GET" && method !== "DELETE") {
      requestOptions.body = JSON.stringify(body);
    }
    const path = url.startsWith('/') ? url : `/${url}`

    const response = await fetch(`${BASE_URL}${path}`, requestOptions);

    const result = await response.json();


    if (!response.ok) {
      let errorMessage = "Something went wrong";
      if (result && result?.message) {
        errorMessage = result.message;
      }
      throw new Error(errorMessage);
    }
    return result
  } catch (error) {
    return error
  }
};
