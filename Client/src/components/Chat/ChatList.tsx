import { useState, useEffect, useCallback } from "react";
import styles from "./ChatList.module.css";
import { User } from "../../types/user";
import { socketService } from "../../services/socket.service";
import { getProfilePictureUrl } from "../../utils/imageUtils";

interface ChatListProps {
  onSelectUser: (user: User) => void;
  currentUser: User;
  token: string;
}

export const ChatList = ({ onSelectUser, currentUser, token }: ChatListProps) => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token || !currentUser) return;

    // Connect to socket if not already connected
    if (!socketService.socket?.connected) {
      socketService.connect(token);
    }

    // Request online users list
    socketService.socket?.emit('getOnlineUsers');

    // Set up online users listener
    const unsubscribe = socketService.onOnlineUsers((users: User[]) => {
      // Filter out current user from the list
      const filteredUsers = users.filter(user => user._id !== currentUser._id);
      setOnlineUsers(filteredUsers);
    });

    return () => {
      unsubscribe();
    };
  }, [token, currentUser]);

  const handleUserClick = useCallback((user: User) => {
    onSelectUser(user);
  }, [onSelectUser]);



  return (
    <div className={styles.chatList}>
      <div className={styles.header}>
        <h2>משתמשים מחוברים</h2>
      </div>
      <div className={styles.userList}>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user) => (
            <div
              key={user._id}
              className={styles.userItem}
              onClick={() => handleUserClick(user)}
            >
              <img
                src={getProfilePictureUrl(user.profilePicture)}
                alt={user.fullName}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <p className={styles.userName}>
                  {user.fullName}
                  <span className={styles.onlineStatus}>מחובר</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noUsers}>אין משתמשים מחוברים כרגע</div>
        )}
      </div>
    </div>
  );
};
