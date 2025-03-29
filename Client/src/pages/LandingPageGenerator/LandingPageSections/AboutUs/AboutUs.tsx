// AboutUs.tsx
import aboutUsStyles from './aboutUs.module.css';
import { useState } from 'react';
import ActionsButtons from '../../LandingPageActions/ActionsButtons/ActionsButtons';

interface AboutUsProps {
  content: string;
  onDelete?: () => void;
}

const AboutUs = ({ content, onDelete }: AboutUsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [editInput, setEditInput] = useState(content);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(editInput);
    setIsEditing(false);
  };

  return (
    <section
      className={aboutUsStyles.aboutUsSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <div className={aboutUsStyles.editContainer}>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className={aboutUsStyles.editInput}
            size={editInput.length > 0 ? editInput.length : 1}
          />
          <button onClick={handleSave} className={aboutUsStyles.saveButton}>
            שמור
          </button>
        </div>
      ) : (
        <p
          className={aboutUsStyles.aboutUsText}
          onDoubleClick={handleDoubleClick}
        >
          {text}
        </p>
      )}
      {isHovered && onDelete && !isEditing && (
        <div className={aboutUsStyles.actionBar}>
          <ActionsButtons onDelete={onDelete} sectionName="aboutUs" />
        </div>
      )}
    </section>
  );
};

export default AboutUs;
