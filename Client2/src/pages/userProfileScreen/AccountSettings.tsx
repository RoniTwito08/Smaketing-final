import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styles from "./UserProfile.module.css";
import { ChatModal } from "../../components/Chat/ChatModal";
import { ChatUser } from "../../components/Chat/ChatList";
import { EditProfileModal } from "./EditProfileModal";
import { usersService } from '../../services/users.service';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  expertise: string[];
  profilePicture?: string;
}

export const AccountSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState<ChatUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = {
    _id: "current123",
    fullName: "דן כהן",
  };

  useEffect(() => {
    const mockUser = {
      _id: currentUser._id,
      email: "marketer@example.com",
      fullName: currentUser.fullName,
      role: "מנהל שיווק דיגיטלי",
      expertise: ["קמפיינים דיגיטליים", "SEO", "תוכן שיווקי", "מדיה חברתית"],
      profilePicture: "https://placehold.co/150x150",
    };
    setUser(mockUser);
  }, [currentUser._id]);

  const handleEditProfile = async (fullName: string, image?: File) => {
    if (!user) return;
    
    try {
      const updatedUser = await usersService.updateProfile(user._id, {
        fullName,
        profilePicture: image
      });
      
      setUser(updatedUser);
      setIsEditModalOpen(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  if (!user) {
    return <Typography>טוען...</Typography>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfo}>
        <img
          src={user.profilePicture}
          alt="Profile"
          className={styles.profilePicture}
        />
        <div className={styles.userDetails}>
          <div className={styles.nameSection}>
            <h2>{user.fullName}</h2>
            <button 
              className={styles.editButton}
              onClick={() => setIsEditModalOpen(true)}
            >
              ערוך פרופיל
            </button>
          </div>
          <p className={styles.role}>{user.role}</p>
          <div className={styles.expertise}>
            {user.expertise.map((exp, index) => (
              <span key={index} className={styles.expertiseTag}>
                {exp}
              </span>
            ))}
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.chatButton}
              onClick={() => setIsChatOpen(true)}
            >
              התחל צ'אט
            </button>
          </div>
        </div>
      </div>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setSelectedChatUser(null);
        }}
        showUserList={!selectedChatUser}
        onSelectUser={(user) => setSelectedChatUser(user)}
        recipientId={selectedChatUser?._id || ""}
        recipientName={selectedChatUser?.fullName || ""}
        currentUserId={currentUser._id}
        currentUserName={currentUser.fullName}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditProfile}
        currentName={user.fullName}
      />
    </div>
  );
}; 