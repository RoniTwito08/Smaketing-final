import { useState } from "react";
import { Typography } from "@mui/material";
import "./AccountSettings.css";
import { EditProfileModal } from "./EditProfileModal";
import { usersService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { config } from "../../config";

export const AccountSettings = () => {
  const { user, setUser, accessToken } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const getProfilePictureUrl = (profilePicture: string | undefined) => {
    if (!profilePicture) return `${config.apiUrl}/images/default-profile.png`;
    if (profilePicture.startsWith("http")) return profilePicture;
    return `${config.apiUrl}/${profilePicture}`;
  };

  const handleEditProfile = async (fullName: string, image?: File) => {
    if (!user) return;
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (image) {
        formData.append("profilePicture", image);
      }

      const updatedUser = await usersService.updateProfile(
        user,
        formData,
        accessToken
      );

      // Ensure profilePicture and fullName are being set
      setUser({
        ...user,
        fullName: updatedUser.fullName || user.fullName,
        profilePicture: updatedUser.profilePicture || user.profilePicture,
      });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating profile");
    }
  };

  if (!user) {
    return <Typography>טוען...</Typography>;
  }

  return (
    <>
      <div className="profileContainer">
        <div className="userInfo">
          <img
            src={getProfilePictureUrl(user.profilePicture)}
            alt="Profile"
            className="profilePicture"
            crossOrigin="anonymous"
          />

          <div className="userDetails">
            <div className="nameSection">
              <h2>{user.fullName}</h2>
              <button
                className="editButton"
                onClick={() => setIsEditModalOpen(true)}
              >
                ערוך פרופיל
              </button>
            </div>
          </div>
        </div>

        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditProfile}
          currentName={user.fullName}
        />
      </div>
    </>
  );
};
