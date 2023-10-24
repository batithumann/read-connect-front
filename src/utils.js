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

export const getBooks = async (search) => {
  try {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    let endpoint = "/books";
    if (search) endpoint += `?search=${search}`;
    return await axios.get(urlServer + endpoint);
  } catch (error) {
    throw error;
  }
};

export const getBooksAdvanced = async (params) => {
  try {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    let filters = [];
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "") filters.push(`${key}=${value}`);
    });
    const endpoint = `/search?${filters.join("&")}`;
    return await axios.get(urlServer + endpoint);
  } catch (error) {
    throw error;
  }
};

export const getMinMaxPages = async () => {
  try {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    const endpoint = "/number_of_pages";
    return await axios.get(urlServer + endpoint);
  } catch (error) {
    throw error;
  }
};
