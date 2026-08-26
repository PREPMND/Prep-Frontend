import axios from "axios";
import { ENV } from "../../../config/environment";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(import.meta.env.API_URL_AUTHORIZATION)

export const apiClientAuthorization = axios.create({
  baseURL:http://localhost:3001 ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});