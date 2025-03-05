import { useState } from "react";
import styles from "./ChatList.module.css";

export interface ChatUser {
  _id: string;
  fullName: string;
  profilePicture: string;
  role: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface ChatListProps {
  onSelectUser: (user: ChatUser) => void;
  currentUserId: string;
}

export const ChatList = ({ onSelectUser, currentUserId }: ChatListProps) => {
  // Mock data for available users
  const mockUsers: ChatUser[] = [
    {
      _id: "user1",
      fullName: "רון לוי",
      profilePicture: "https://placehold.co/50x50",
      role: "מנהל קמפיינים",
      lastMessage: "תודה רבה על העזרה!",
      lastMessageTime: "10:30",
    },
    {
      _id: "user2",
      fullName: "מיכל כהן",
      profilePicture: "https://placehold.co/50x50",
      role: "יועצת שיווק דיגיטלי",
      lastMessage: "אשמח לקבוע פגישת ייעוץ",
      lastMessageTime: "09:15",
    },
    {
      _id: "user3",
      fullName: "אבי ישראלי",
      profilePicture: "https://placehold.co/50x50",
      role: "מומחה SEO",
      lastMessage: "בוא נדבר על אסטרטגיית התוכן",
      lastMessageTime: "אתמול",
    },
  ];

  return (
    <div className={styles.chatList}>
      <div className={styles.header}>
        <h2>צ'אטים</h2>
      </div>
      <div className={styles.userList}>
        {mockUsers.map((user) => (
          <div
            key={user._id}
            className={styles.userItem}
            onClick={() => onSelectUser(user)}
          >
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <h3>{user.fullName}</h3>
              <span className={styles.userRole}>{user.role}</span>
              {user.lastMessage && (
                <p className={styles.lastMessage}>
                  {user.lastMessage}
                  <span className={styles.messageTime}>
                    {user.lastMessageTime}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
