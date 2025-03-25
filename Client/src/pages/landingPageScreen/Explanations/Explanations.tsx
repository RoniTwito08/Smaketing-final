import ExplainPictures from "./ExplainPictures";

interface ExplainsProps {
  direction: "row" | "row-reverse"; //row= picture at the left side, row-reverse= picture at the right side
  imageSource: string;
  Header: string;
  text: string;
}

const Explainations: React.FC<ExplainsProps> = ({
  direction,
  imageSource,
  Header,
  text,
}) => {
  return (
    <div
      className="explain"
      style={{ ...styles.container, flexDirection: direction }}
    >
      <ExplainPictures
        direction={direction}
        imageSource={imageSource}
        text={Header}
      />

      <div className="text" style={styles.text}>
        <p style={styles.paragraph}>{text}</p>
      </div>
    </div>
  );
};

{
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    margin: "20px",
    marginRight: "20px",
    marginLeft: "20px",
  },
  text: {
    flex: "1 1 300px",
    fontSize: "20px",
    color: "#333",
  },
  paragraph: {
    margin: 0,
    padding: 0,
    lineHeight: "1.6",
    direction: "rtl" as const,
    textAlign: "justify" as const,
    fontSize: "20px",
  },
};

export default Explainations;
