import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

const Step4: React.FC = () => {
  const { control, watch } = useFormContext();
  const watchedFiles = watch("logoFiles");

  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // const handleImageChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   onChange: (...event: any[]) => void
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     onChange(e.target.files);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //   }
  // };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>מותג וזיהוי ויזואלי</h1>

      {/* שורה 1 */}
      <div style={styles.question}>
        <p>האם יש לך לוגו, צבעי מותג או חומרים גרפיים שתרצה שנשתמש בהם?</p>
        <Controller
          name="logoFiles"
          control={control}
          defaultValue={null}
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
                type="file"
                accept="image/*,.pdf"
                multiple
                style={styles.hiddenInput}
                // onChange={(e) => handleImageChange(e, field.onChange)}
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
        {/* {imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100px", borderRadius: "4px" }}
            />
          </div>
        )} */}
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
          defaultValue=""
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
            defaultValue={[]}
            render={({ field }) => (
              <>
                {["Facebook", "Instagram", "TikTok", "Twitter", "Other"].map(
                  (platform) => (
                    <label key={platform}>
                      <input
                        type="checkbox"
                        value={platform}
                        checked={field.value.includes(platform)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          field.onChange(
                            isChecked
                              ? [...field.value, platform]
                              : field.value.filter(
                                  (item: string) => item !== platform
                                )
                          );
                        }}
                      />
                      {platform}
                    </label>
                  )
                )}
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
    fontFamily: "Assistant, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "10px",
    backgroundColor: "transparent",
    display: "inline-block",
    maxHeight: "400px",
    overflowY: "auto",
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
    backgroundColor: "#808080",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
  } as const,
  fileUploadLabelHover: {
    backgroundColor: "#6c6c6c",
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
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  } as const,
} as const;

export default Step4;
