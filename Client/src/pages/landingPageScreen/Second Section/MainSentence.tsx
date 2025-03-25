const MainSentence: React.FC = ({}) => {
  return (
    <div style={styles.MainDiv} className="MainSentence">
      <h1 style={styles.MainH1}>
        שיווק דיגיטלי מתקדם לעסקים <br /> עם כוחה של הבינה המלאכותית{" "}
      </h1>
    </div>
  );
};

const styles = {
  MainDiv: {
    marginTop: "0px",
  },

  MainH1: {
    color: "#021024",
    fontFamily: "Assistant",
    fontSize: "60px",
    fontWeight: "bold",
    textAlign: "right" as const,
    lineHeight: "1.75",
    marginTop: "0px",
    margin: 0, // אין ריווח חיצוני מיותר
    padding: 0,
  },
};

export default MainSentence;
