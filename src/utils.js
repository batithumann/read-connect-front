import axios from "axios";

export const getUser = async (token) => {
  try {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    const endpoint = "/user";
    return await axios.get(urlServer + endpoint, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    throw error;
  }
};
