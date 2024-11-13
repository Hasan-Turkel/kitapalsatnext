import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAtomValue } from "jotai"; // Jotai atomunu okuma
import { tokenAtom } from "@/utils/atoms"

// Axios instance'ı oluşturuyoruz
const createAxiosInstance = (token:string): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // API URL'ini çevre değişkeninden alıyoruz
    timeout: 15 * 1000, // Timeout süresi
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      // Token'ı Jotai'den alıyoruz
     

      if (token) {
        // Eğer token varsa, header'a Authorization ekliyoruz
        request.headers!["Authorization"] = `Bearer ${token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance;
};

// Custom hook: `useAxios`
const useAxios = (): AxiosInstance => {
  const token = useAtomValue(tokenAtom);
  return createAxiosInstance(token);
};

export default useAxios;
