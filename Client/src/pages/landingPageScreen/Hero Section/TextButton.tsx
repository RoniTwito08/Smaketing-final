interface TextButtonProps {
  text: string;
}

const TextButton: React.FC<TextButtonProps> = ({ text }) => {
  return (
    <div>
      <button style={styles} className="login-button">
        {text}
      </button>
    </div>
  );
};

const styles = {
  color: "#8987A1",
  fontFamily: "Assistant",
  fontSize: "16px",
  lineWieght: "150%",
  borderRadius: "0px",
  backgroundColor: "transparent",
  border: "none",
  textDecoration: "underline",
  margin: "0px 16px",
};

export default TextButton;
