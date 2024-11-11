import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Storage from "./storage";

const instance: AxiosInstance = axios.create({
  baseURL:'http://127.0.0.1:8000/',
  timeout: 15 * 1000,
});

// Request interceptor
instance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    // Burada `InternalAxiosRequestConfig` tipini kullandık
    const accessToken = await Storage.getItem<string>("accessToken");

    if (accessToken) {
      // headers özelliği tanımlı olmalı, bu nedenle `request.headers!` kullandık
      request.headers!["authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

export default instance;
