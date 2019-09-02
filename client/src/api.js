import axios from "axios";

const API = "http://localhost:3000";

export async function register(data) {
  const response = await axios.post(`${API}/register`, data);

  return response.data;
}

export async function login(data) {
  const response = await axios.post(`${API}/login`, data);
  const token = response.data.token;

  if (token) {
    window.localStorage.setItem("token", token);
  }

  return response.data;
}

export async function users() {
  const token = window.localStorage.getItem("token");
  const response = await axios.get(`${API}/users`, {
    headers: { Authorization: JSON.stringify(token) }
  });

  return response.data;
}

export async function getMessages(receiverId) {
  const token = window.localStorage.getItem("token");
  const response = await axios.get(`${API}/message/${receiverId}`, {
    headers: { Authorization: JSON.stringify(token) }
  });

  return response.data;
}

export async function postMessages(data, receiverId) {
  const token = window.localStorage.getItem("token");
  const response = await axios.post(`${API}/message/${receiverId}`, data, {
    headers: { Authorization: JSON.stringify(token) }
  });

  return response.data;
}
