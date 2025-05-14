import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL + "/api/auth";
console.log(API)


export const loginUser = (data) => axios.post(`${API}/login`, data);
export const registerUser = (data) => axios.post(`${API}/register`, data);
