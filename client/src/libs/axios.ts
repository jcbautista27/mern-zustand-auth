import axios from "axios";
import { useAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const token = useAuthStore.getState().token;

authApi.interceptors.request.use(config => {
  config.headers.set(
    "Authorization", `Bearer ${token}`,
  );
  return config;
});

export default authApi;
