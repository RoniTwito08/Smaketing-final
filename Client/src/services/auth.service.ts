import axios from 'axios';
import { config } from '../config';

const API_URL = `${config.apiUrl}/auth`;

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  async googleLogin(): Promise<{ authUrl: string }> {
    const response = await axios.get(`${API_URL}/google`);
    return response.data;
  },

  async googleCallback(code: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/google/callback`, { code });
    return response.data;
  }
}; 