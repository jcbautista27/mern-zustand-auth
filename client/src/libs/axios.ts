import axios from "axios";
import { userAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const token = userAuthStore.getState().token;

authApi.interceptors.request.use(config => {
  config.headers.set(
    "Authorization", `Bearer ${token}`,
  );
  return config;
});

export default authApi;
