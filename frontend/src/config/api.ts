import { isTokenExpired, refreshAccessToken } from "@/auth/services";
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        try {
          isRefreshing = true;

          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          console.log("\n2refresh token:", refreshToken, "\n");
          const newAccessToken = await refreshAccessToken(refreshToken);
          localStorage.setItem("token", newAccessToken);
          token = newAccessToken;

          processQueue(null, newAccessToken);
        } catch (err) {
          console.error("Token refresh failed:", err);
          processQueue(err, null);
          throw err;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          },
          reject: (err: any) => {
            reject(err);
          },
        });
      });
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const newAccessToken = await refreshAccessToken(refreshToken);
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return api(originalRequest); // Retry the request with new access token
      } catch (err) {
        processQueue(err, null);
        console.error("Token refresh failed:", err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
