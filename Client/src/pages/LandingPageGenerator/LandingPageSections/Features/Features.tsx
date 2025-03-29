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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    // Initialize services from content slice
    const initialServices = content.slice(2, content.length - 3).map(service =>
      service.replace(/['",]/g, "").trim()
    );
    setServices(initialServices);
    console.log(image);
  }, [content]);

  const handleDoubleClick = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditingValue(currentValue);
  };

  const handleSave = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index] = editingValue;
    setServices(updatedServices);
    setEditingIndex(null);
    setEditingValue("");
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
            {services.map((service, index) => (
              <li key={index} className={featuresStyles.featureItem}>
                {editingIndex === index ? (
                  <div className={featuresStyles.editContainer}>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className={featuresStyles.editInput}
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className={featuresStyles.saveButton}
                    >
                      שמור
                    </button>
                  </div>
                ) : (
                  <span onDoubleClick={() => handleDoubleClick(index, service)}>
                    {service}
                  </span>
                )}
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
