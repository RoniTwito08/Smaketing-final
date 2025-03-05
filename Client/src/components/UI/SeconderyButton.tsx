interface SeconderyButtonProps {
  text: string;
}

const SeconderyButton: React.FC<SeconderyButtonProps> = ({ text }) => {
  return (
    <div>
      <button className="register-button" style={styles.button}>
        {text}
      </button>
    </div>
  );
};

const styles = {
  button: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#001D3F",
    fontFamily: "Assistant",
    fontSize: "16px",
    border: "2px solid #001D3F",
    margin: "0px 0px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// הוספת סגנונות hover ו-focus ב-CSS
const cssStyles = `
  .register-button:hover {
    background-color: #001D3F; /* כחול כהה בזמן hover */
    color: #FFFFFF; /* טקסט לבן */
  }

  .register-button:focus {
    outline: none; /* הסרת מסגרת ברירת מחדל */
    box-shadow: 0 0 4px #001D3F; /* מסגרת זוהרת */
  }
`;

// הוספת הסגנונות לדף
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = cssStyles;
document.head.appendChild(styleSheet);

export default SeconderyButton;
