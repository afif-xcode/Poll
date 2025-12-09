import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAllPolls = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Something went wrong" };
  }
};

export const getSinglePoll = async (id) => {
  try {
    const response = await API.get(`/poll/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Something went wrong" };
  }
};

export const createPoll = async (data) => {
  try {
    const response = await API.post("/poll/create", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Something went wrong" };
  }
};

export const editPoll = async (id, data) => {
  try {
    const response = await API.patch(`/poll/edit/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Something went wrong" };
  }
};

export const deletePoll = async (id) => {
  try {
    const response = await API.delete(`/poll/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Something went wrong" };
  }
};
