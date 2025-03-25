// import axios from 'axios';
// import { config } from '../config';

// const API_URL = config.apiUrl;

// export interface Post {
//   _id: string;
//   postData: string;
//   senderId: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export const postsService = {
//   async getAllPosts(): Promise<Post[]> {
//     const response = await axios.get(`${API_URL}/posts`);
//     return response.data;
//   },

//   async getPostsBySenderId(senderId: string): Promise<Post[]> {
//     const response = await axios.get(`${API_URL}/posts/filter?senderId=${senderId}`);
//     return response.data;
//   },

//   async createPost(postData: string, senderId: string): Promise<Post> {
//     const response = await axios.post(`${API_URL}/posts`, { postData, senderId });
//     return response.data;
//   },

//   async updatePost(postId: string, postData: string): Promise<Post> {
//     const response = await axios.put(`${API_URL}/posts/${postId}`, { postData });
//     return response.data;
//   },

//   async deleteAllPosts(): Promise<void> {
//     await axios.delete(`${API_URL}/posts`);
//   }
// };
