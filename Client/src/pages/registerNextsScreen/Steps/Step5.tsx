import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const Step5: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>מטרות עסקיות ודף הנחיתה</h1>

      {/* בחירת מטרה */}
      <div style={styles.question}>
        <label style={styles.label} htmlFor="objective">
          בחירת מטרה (Objective):
        </label>
        <Controller
          name="objective"
          control={control}
          render={({ field }) => (
            <select {...field} id="objective" style={styles.select}>
              <option value="" disabled>
                בחר מטרה
              </option>
              <option value="brandAwareness">הגדלת המודעות למותג שלך</option>
              <option value="reach">הגעה למספר גדול של אנשים</option>
              <option value="siteVisit">
                ביקור באתר/ אפליקציה/ חנות פיזית
              </option>
              <option value="engagement">
                מעורבות- קבלת יותר לייקים, תגובות או שיתופים
              </option>
              <option value="videoViews">צפיות בווידאו</option>
              <option value="sales">הגדלת המכירות</option>
            </select>
          )}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  },
  question: {
    marginBottom: "20px",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  select: {
    flex: 1,
    padding: "8px 24px 8px 8px",
    fontSize: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M0 0L2 2L4 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    appearance: "none",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  } as const,
} as const;

export default Step5;
