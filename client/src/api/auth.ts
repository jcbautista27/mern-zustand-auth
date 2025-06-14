import axios from '../lib/axios'

export const loginRequest = async (email: string, password: string) => {
  return await axios.post("/login", {
    email,
    password,
  });
};


export const profileRequest = async() => {
  return await axios.get("/profile")
}