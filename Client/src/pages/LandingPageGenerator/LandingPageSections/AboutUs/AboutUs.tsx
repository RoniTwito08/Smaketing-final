import aboutUsStyles from './aboutUs.module.css';
import { useState } from 'react';
import ActionsButtons from '../../LandingPageActions/ActionsButtons/ActionsButtons';

interface AboutUsProps {
  content: string;
  onDelete?: () => void;
}

const AboutUs = ({ content, onDelete }: AboutUsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState(content);

  const handleBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
    setText(e.currentTarget.innerText);
  };

  return (
    <section
      className={aboutUsStyles.aboutUsSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        className={aboutUsStyles.aboutUsText}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
      >
        {text}
      </p>

      {isHovered && onDelete && (
        <div className={aboutUsStyles.actionBar}>
          <ActionsButtons onDelete={onDelete} sectionName="aboutUs" />
        </div>
      )}
    </section>
  );
};

export default AboutUs;
