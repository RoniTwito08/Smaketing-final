import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const Step4: React.FC = () => {
  const { control, watch } = useFormContext();

  const watchedFiles = watch("logoFiles");

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>מותג וזיהוי ויזואלי</h1>

      {/* שורה 1 */}
      <div style={styles.question}>
        <p>האם יש לך לוגו, צבעי מותג או חומרים גרפיים שתרצה שנשתמש בהם?</p>
        <Controller
          name="logoFiles"
          control={control}
          render={({ field }) => (
            <label
              style={styles.fileUploadLabel}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.fileUploadLabelHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.fileUploadLabel.backgroundColor)
              }
            >
              <input
                {...field}
                type="file"
                accept="image/*,.pdf"
                multiple
                style={styles.hiddenInput}
                onChange={(e) => {
                  const files = e.target.files as FileList; // הגדרת טיפוס הקובץ
                  field.onChange(files);
                  console.log("Selected files:", files);
                }}
              />
              בחר קבצים
            </label>
          )}
        />
        {watchedFiles && (
          <p>
            קבצים שנבחרו:{" "}
            {Array.from(watchedFiles as FileList)
              .map((file) => file.name)
              .join(", ")}
          </p>
        )}
      </div>

      {/* שורה 2 */}
      <div style={styles.question}>
        <p>
          האם יש סגנון עיצובי מסוים שאתה מעדיף (לדוגמה: מודרני, מינימליסטי,
          יצירתי)?
        </p>
        <Controller
          name="designPreferences"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="נא לפרט כאן..."
              style={styles.textarea}
            ></textarea>
          )}
        />
      </div>

      {/* שורה 3 */}
      <div style={styles.question}>
        <p>האם יש לך חשבון עסקי ברשתות החברתיות?</p>
        <div style={styles.checkboxGroup}>
          <Controller
            name="socialMediaAccounts"
            control={control}
            render={({ field }) => (
              <>
                <label>
                  <input
                    type="checkbox"
                    value="Facebook"
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      field.onChange(
                        isChecked
                          ? [...field.value, value]
                          : field.value.filter((item: string) => item !== value)
                      );
                    }}
                  />{" "}
                  Facebook
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Instagram"
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      field.onChange(
                        isChecked
                          ? [...field.value, value]
                          : field.value.filter((item: string) => item !== value)
                      );
                    }}
                  />{" "}
                  Instagram
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="TikTok"
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      field.onChange(
                        isChecked
                          ? [...field.value, value]
                          : field.value.filter((item: string) => item !== value)
                      );
                    }}
                  />{" "}
                  TikTok
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Twitter"
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      field.onChange(
                        isChecked
                          ? [...field.value, value]
                          : field.value.filter((item: string) => item !== value)
                      );
                    }}
                  />{" "}
                  Twitter
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Other"
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      field.onChange(
                        isChecked
                          ? [...field.value, value]
                          : field.value.filter((item: string) => item !== value)
                      );
                    }}
                  />{" "}
                  אחר
                </label>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  question: {
    marginBottom: "20px",
  },
  fileUploadLabel: {
    display: "inline-block",
    padding: "10px 20px",
    color: "#fff",
    backgroundColor: "#808080", // אפור
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
  } as const,
  fileUploadLabelHover: {
    backgroundColor: "#6c6c6c", // אפור כהה
  } as const,
  hiddenInput: {
    display: "none",
  } as const,
  textarea: {
    width: "100%",
    height: "80px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "14px",
  } as const,
  checkboxGroup: {
    marginBottom: "10px",
    fontSize: "14px",
  } as const,
} as const;

export default Step4;
