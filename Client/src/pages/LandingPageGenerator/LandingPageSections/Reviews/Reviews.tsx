// Reviews.tsx
import reviewsStyles from './reviews.module.css';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import ActionsButtons from '../../LandingPageActions/ActionsButtons/ActionsButtons';

interface ReviewsProps {
  content: string[];
  onDelete?: () => void;
}

const Reviews = ({ content, onDelete }: ReviewsProps) => {
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reviews, setReviews] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    const initialReviews = content
      .slice(2, content.length - 3)
      .map(review => review.replace(/['",]/g, "").trim());
    setReviews(initialReviews);
  }, [content]);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 3) + 1);
  }, []);

  const handleDoubleClick = (index: number) => {
    setEditingIndex(index);
    setEditingValue(reviews[index]);
  };

  const handleSave = (index: number) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = editingValue;
    setReviews(updatedReviews);
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <section
      className={reviewsStyles.reviewsSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={reviewsStyles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div key={index} className={reviewsStyles.reviewCard}>
            <img
              src={
                index % 2 === 0
                  ? "http://localhost:3000/src/assets/menReviewer.png"
                  : "http://localhost:3000/src/assets/womenReviewer.png"
              }
              className={reviewsStyles.pic}
              alt="Reviewer"
            />
            {editingIndex === index ? (
              <div className={reviewsStyles.editContainer}>
                <textarea
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className={reviewsStyles.editInput}
                />
                <button
                  onClick={() => handleSave(index)}
                  className={reviewsStyles.saveButton}
                >
                  שמור
                </button>
              </div>
            ) : (
              <p
                className={reviewsStyles.reviewText}
                onDoubleClick={() => handleDoubleClick(index)}
              >
                {review}
              </p>
            )}
            <div className={reviewsStyles.stars}>
              {index === randomIndex ? (
                <>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </>
              ) : (
                <>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {isHovered && onDelete && (
        <div className={reviewsStyles.actionBar}>
          <ActionsButtons onDelete={onDelete} sectionName="reviews" />
        </div>
      )}
    </section>
  );
};

export default Reviews;
