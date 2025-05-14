// src/api/axiosInstance.js
import axios from "axios";

const teamApiInstance = axios.create({
  baseURL: "http://localhost:5000", // fallback to local
  withCredentials: true, // if you’re using cookies for auth
});

export default teamApiInstance;
