export interface User {
  email: string;
  fullName: string; // Use fullName consistently instead of name

  _id?: string; // Consistent ID field
  password?: string;
  imgUrl?: string;

  role?: string;
  expertise?: string[];
  profilePicture?: string;
  online?: boolean; // For chat functionality
  lastSeen?: Date; // For chat functionality
}
