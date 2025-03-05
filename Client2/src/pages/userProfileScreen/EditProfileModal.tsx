import { useState } from 'react';
import styles from './EditProfileModal.module.css';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fullName: string, image?: File) => void;
  currentName: string;
}

export const EditProfileModal = ({ isOpen, onClose, onSubmit, currentName }: EditProfileModalProps) => {
  const [fullName, setFullName] = useState(currentName);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    if (!fullName.trim()) return;
    onSubmit(fullName, selectedImage || undefined);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>עריכת פרטים</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>שם מלא</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>תמונת פרופיל</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className={styles.imagePreview}
              />
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              שמור שינויים
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className={styles.cancelButton}
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 