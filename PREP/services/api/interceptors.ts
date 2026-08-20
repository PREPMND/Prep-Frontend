import type { AxiosError } from "axios";
import { apiClient } from "./apiClient";

export const setupApiInterceptors = () => {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        
      }

      return Promise.reject(error);
    }
  );
};