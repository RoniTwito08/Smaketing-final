import { useState } from 'react';
import styles from './CreatePostModal.module.css';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: string, image?: File, userName?: string) => void;
}

export const CreatePostModal = ({ isOpen, onClose, onSubmit }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      onSubmit(postContent, selectedImage || undefined, userName);
      setPostContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setUserName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>יצירת פוסט חדש</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="שם המשתמש"
            className={styles.input}
          />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="על מה תרצה לשתף?"
            className={styles.contentInput}
          />
          
          <div className={styles.imageUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imageInput"
              className={styles.fileInput}
            />
            <label htmlFor="imageInput" className={styles.uploadButton}>
              {imagePreview ? 'שנה תמונה' : 'הוסף תמונה'}
            </label>
          </div>

          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!postContent.trim()}
          >
            פרסם
          </button>
        </form>
      </div>
    </div>
  );
}; 