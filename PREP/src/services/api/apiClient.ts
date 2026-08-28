import axios from "axios";
import { ENV } from "../../../config/environment";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientAuthorization = axios.create({
  baseURL:'http://localhost:3001' ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientChallenge = axios.create({
  baseURL:'http://localhost:3003' ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientMedia = axios.create({
  baseURL:'http://localhost:3011' ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});