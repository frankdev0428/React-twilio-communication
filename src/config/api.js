import axios from "axios";


const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = "https://damp-garden-28261.herokuapp.com/";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  let user = JSON.parse(localStorage.getItem("communicateUser"));
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
