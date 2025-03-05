export interface User {
  _id: string;          // Consistent ID field
  email: string;
  fullName: string;     // Use fullName consistently instead of name
  role: string;
  expertise: string[];
  profilePicture?: string;
  online?: boolean;     // For chat functionality
  lastSeen?: Date;      // For chat functionality
} 