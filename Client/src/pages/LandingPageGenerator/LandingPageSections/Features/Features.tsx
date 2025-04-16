import featuresStyles from './features.module.css';
import ActionsButtons from '../../LandingPageActions/ActionsButtons/ActionsButtons';
import { useState, useEffect } from 'react';

interface FeaturesProps {
  content: string[];
  image: string;
  onDelete?: () => void;
}

const Features = ({ content, image, onDelete }: FeaturesProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    const initialServices = content
      .slice(2, content.length - 3)
      .map(s => s.replace(/['",]/g, '').trim());
    setServices(initialServices);
  }, [content]);

  const handleBlur = (index: number, e: React.FocusEvent<HTMLSpanElement>) => {
    const newText = e.currentTarget.innerText;
    setServices(prev => {
      const copy = [...prev];
      copy[index] = newText;
      return copy;
    });
  };

  return (
    <section
      className={featuresStyles.featuresSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={featuresStyles.featuresContentContainer}>
        <div className={featuresStyles.featuresImageContainer}>
          <img
            src={image}
            alt="Business Services"
            className={featuresStyles.featuresImage}
          />
        </div>
        <div className={featuresStyles.featuresContent}>
          <ul className={featuresStyles.featuresList}>
            {services.map((service, idx) => (
              <li key={idx} className={featuresStyles.featureItem}>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleBlur(idx, e)}
                  className={featuresStyles.featureText}
                >
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isHovered && onDelete && (
        <div className={featuresStyles.actionBar}>
          <ActionsButtons onDelete={onDelete} sectionName="features" />
        </div>
      )}
    </section>
  );
};

export default Features;
