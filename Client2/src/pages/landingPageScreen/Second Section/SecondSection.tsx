import MainButton from "../../../components/UI/MainButton";
import SeconderyButton from "../../../components/UI/SeconderyButton";
import MainAnimation from "./MainAnimation";
import MainSentence from "./MainSentence";

const SecondSection: React.FC = () => {
  return (
    <div className="second-section" style={styles.section}>
      <div style={styles.rightSection}>
        <div style={styles.buttonsContainer}>
          <MainButton text="התחל עכשיו" />
          <SeconderyButton text="גלה עוד" />
        </div>
        <MainSentence />
      </div>

      <div style={styles.leftSection}>
        <MainAnimation />
      </div>
    </div>
  );
};

const styles = {
  section: {
    display: "flex",
    flexDirection: "row-reverse" as const, // צד ימין ושמאל באותה שורה
    alignItems: "center", // יישור אנכי
    width: "100%", // מניעת גלילה אופקית
    padding: "50px", // מסיר רווחים מכל הצדדים
    paddingTop: "0px", // מסיר רווח מלמעלה
    gap: "20px", // מסיר רווח בין צד ימין לשמאל
    boxSizing: "border-box" as const,
    margin: "0px",
  },

  rightSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end", // כל התוכן בצד ימין
    maxWidth: "60%", // נותן יותר מקום לצד ימין
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row-reverse" as const, // כפתורים מימין לשמאל
    gap: "16px",
  },

  leftSection: {
    display: "flex", // מתאים את גודל ה-div לגודל האנימציה
    justifyContent: "flex-start", // ממקם את התוכן בצד שמאל
    alignItems: "center", // יישור אנכי
    width: "40%", // מצמצם את המקום של החלק השמאלי
    transform: "translateX(-20px)", // מזיז את החלק השמאלי שמאלה
    boxSizing: "border-box" as const,
  },
};

export default SecondSection;
