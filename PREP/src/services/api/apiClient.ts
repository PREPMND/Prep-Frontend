import axios from "axios";
import { ENV } from "../../../config/environment";
import { Import } from "lucide-react";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientAuthorization = axios.create({
  baseURL: Import.meta.env,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});