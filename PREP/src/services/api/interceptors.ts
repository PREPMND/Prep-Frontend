import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { apiClient } from "./apiClient";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

let failedRequests: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error?: unknown) => {
  failedRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedRequests = [];
};

export const setupApiInterceptors = () => {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest =
        error.config as RetryRequestConfig;

      if (
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post("/auth/refresh");

        processQueue();

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};