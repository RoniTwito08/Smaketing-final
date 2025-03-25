export interface User {
  _id?: string; // Consistent ID field
  email: string;
  password?: string;
  fullName: string; // We have fullName field
  profilePicture?: string;

  role?: string;
  expertise?: string[];

  online?: boolean; // For chat functionality
  lastSeen?: Date; // For chat functionality
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
