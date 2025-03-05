import axios from 'axios';
import { config } from '../config';
import { User } from '../types/user';

const API_URL = config.apiUrl;

export interface UpdateProfileData {
  fullName: string;
  profilePicture?: File;
}

export const usersService = {
  async updateProfile(userId: string, data: UpdateProfileData): Promise<User> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }

    const response = await axios.put(`${API_URL}/users/${userId}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getProfile(userId: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  }
}; 