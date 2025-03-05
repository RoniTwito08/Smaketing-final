import axios from "axios";
import { User } from "../../types/user";
import { CredentialResponse } from "@react-oauth/google";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to register";
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to login";
  }
};

export const googleSignin = async (credentialResponse: CredentialResponse) => {
  return new Promise<User>((resolve, reject) => {
    console.log("googleSignin...");
    api
      .post("/auth/google", credentialResponse)
      .then((response: any) => {
        console.log("googleSignin response:", response);
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error("googleSignin error:", error);
        reject(error);
      });
  });
};

export default api;
