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

  useEffect(() => {
    const initialReviews = content
      .slice(2, content.length - 3)
      .map(review => review.replace(/['",]/g, "").trim());
    setReviews(initialReviews);
  }, [content]);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * reviews.length));
  }, [reviews]);

  const handleBlur = (index: number, e: React.FocusEvent<HTMLParagraphElement>) => {
    const newText = e.currentTarget.innerText;
    setReviews(prev => {
      const copy = [...prev];
      copy[index] = newText;
      return copy;
    });
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
                  ? "/src/assets/menReviewer.png"
                  : "/src/assets/womenReviewer.png"
              }
              className={reviewsStyles.pic}
              alt="Reviewer"
            />
            <p
              className={reviewsStyles.reviewText}
              contentEditable
              suppressContentEditableWarning
              onBlur={e => handleBlur(index, e)}
            >
              {review}
            </p>
            <div className={reviewsStyles.stars}>
              {index === randomIndex ? (
                <>
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                </>
              ) : (
                <>
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
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
