import React, { useEffect } from "react";
import styles from "./TourPopup.module.css";

interface TourPopupProps {
  title: string;
  description: string;
  targetRef: React.RefObject<HTMLElement>;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const TourPopup = ({
  title,
  description,
  targetRef,
  step,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}: TourPopupProps) => {

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add(styles["tour-highlight"]);

    return () => {
      target.classList.remove(styles["tour-highlight"]);
    };
  }, [targetRef, step]);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.controls}>
          <button onClick={onBack} disabled={step === 0}>הקודם</button>
          {step < totalSteps - 1 ? (
            <button onClick={onNext}>הבא</button>
          ) : (
            <button onClick={onSkip}>סיום</button>
          )}
          <button onClick={onSkip} className={styles.skip}>דלג</button>
        </div>
      </div>
    </div>
  );
};

export default TourPopup;