import React from "react";
import styles from "./RegisterBase.module.css";
import MultiStepForm from "./Stepper";

const RegisterBase: React.FC = () => {
  return (
    <div className={styles.formsPageWrapper}>
      {/* <button className={styles.backButton} onClick={() => {}}>
        &larr; המשך מאוחר יותר
      </button> */}

      <div className={`${styles.container}`}>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default RegisterBase;
