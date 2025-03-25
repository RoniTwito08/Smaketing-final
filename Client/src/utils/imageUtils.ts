import { config } from "../config";

export const getProfilePictureUrl = (profilePicture: string | undefined | null): string => {
  if (!profilePicture) {
    return "https://placehold.co/50x50";
  }

  // If it's already a full URL (starts with http:// or https://)
  if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://')) {
    return profilePicture;
  }

  // If it's a relative path, prepend the API base URL
  return `${config.apiUrl}/${profilePicture}`;
}; 