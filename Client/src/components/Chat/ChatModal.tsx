import { useState } from 'react';
import styles from './ChatModal.module.css';
import { ChatList } from './ChatList';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  recipientName: string;
  currentUserId: string;
  currentUserName: string;
  showUserList?: boolean;
  onSelectUser?: (user: ChatUser) => void;
}

export const ChatModal = ({ 
  isOpen, 
  onClose, 
  recipientId, 
  recipientName,
  currentUserId,
  currentUserName,
  showUserList,
  onSelectUser
}: ChatModalProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: recipientId,
      senderName: recipientName,
      content: 'היי! ראיתי שאתה מתמחה בקידום ברשתות חברתיות',
      timestamp: new Date(Date.now() - 50000).toISOString()
    },
    {
      id: '2',
      senderId: currentUserId,
      senderName: currentUserName,
      content: 'נכון! אני עובד בתחום כבר 5 שנים. במה אוכל לעזור?',
      timestamp: new Date(Date.now() - 40000).toISOString()
    },
    {
      id: '3',
      senderId: recipientId,
      senderName: recipientName,
      content: 'אשמח להתייעץ על אסטרטגיית קידום לעסק חדש שאני מקים',
      timestamp: new Date(Date.now() - 30000).toISOString()
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: currentUserName,
        content: message,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {showUserList ? (
          <ChatList 
            onSelectUser={(user) => {
              onSelectUser?.(user);
            }}
            currentUserId={currentUserId}
          />
        ) : (
          <div className={styles.modal}>
            <div className={styles.header}>
              <div className={styles.recipientInfo}>
                <h3>{recipientName}</h3>
                <span className={styles.onlineStatus}>מחובר</span>
              </div>
              <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>

            <div className={styles.messageList}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`${styles.message} ${msg.senderId === currentUserId ? styles.sent : styles.received}`}
                >
                  <p>{msg.content}</p>
                  <span className={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleTimeString('he-IL')}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className={styles.inputArea}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="כתוב הודעה..."
                className={styles.messageInput}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={!message.trim()}
              >
                שלח
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}; 