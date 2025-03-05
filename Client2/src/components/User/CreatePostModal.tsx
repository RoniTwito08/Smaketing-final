import { useState } from 'react';
import styles from './CreatePostModal.module.css';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: string, image?: File) => void;
}

export const CreatePostModal = ({ isOpen, onClose, onSubmit }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) return;
    
    onSubmit(postContent, selectedImage || undefined);
    
    // Reset form
    setPostContent('');
    setSelectedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>יצירת פוסט חדש</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="על מה תרצה לשתף?"
            className={styles.postInput}
          />
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!postContent.trim()}
          >
            פרסם
          </button>
        </form>
        
        <button 
          onClick={onClose}
          className={styles.closeButton}
        >
          ביטול
        </button>
      </div>
    </div>
  );
}; 