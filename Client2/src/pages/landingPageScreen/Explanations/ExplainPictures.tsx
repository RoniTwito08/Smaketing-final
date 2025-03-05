import React from "react";
import Rectangle from "./Rectangle";

interface ExplainPicturesProps {
  direction: "row" | "row-reverse"; //row= picture at the left side, row-reverse= picture at the right side
  imageSource: string;
  text: string;
}

const ExplainPictures: React.FC<ExplainPicturesProps> = ({
  direction,
  imageSource,
  text,
}) => {
  let BlueTop: string,
    BlueLeft: string,
    GreyTop: string,
    GreyLeft: string,
    LightBlueTop: string,
    LightBlueLeft: string,
    PicLeft: string,
    PicTop: string,
    TextLeft: string,
    TextTop: string;

  if (direction === "row") {
    BlueTop = "0px";
    BlueLeft = "0px";
    GreyTop = "40px";
    GreyLeft = "35px";
    LightBlueTop = "250px";
    LightBlueLeft = "0px";
    PicLeft = "67.5px";
    PicTop = "60px";
    TextLeft = "67.5px";
    TextTop = "60px";
  } else {
    BlueTop = "0px";
    BlueLeft = "333.41px";
    GreyTop = "40px";
    GreyLeft = "0px";
    LightBlueTop = "250px";
    LightBlueLeft = "253.41px";
    PicLeft = "0px";
    PicTop = "60px";
    TextLeft = "0px";
    TextTop = "60px";
  }

  return (
    <div className="container" style={styles.container}>
      <Rectangle
        backgroundColor={"#001d3f"}
        width={"100px"}
        height={"350px"}
        top={BlueTop}
        left={BlueLeft}
        zIndex={"1"}
      />

      <Rectangle
        backgroundColor={"#d3d3d3"}
        width={"433.41px"}
        height={"280px"}
        top={GreyTop}
        left={GreyLeft}
        zIndex={"2"}
      />

      <Rectangle
        backgroundColor={"#3a86ff"}
        width={"180px"}
        height={"100px"}
        top={LightBlueTop}
        left={LightBlueLeft}
        zIndex={"3"}
      />

      <img
        src={imageSource}
        className="image"
        style={{ ...styles.image, left: PicLeft, top: PicTop }}
      />

      <div
        className="text"
        style={{ ...styles.text, left: TextLeft, top: TextTop }}
      >
        <h1 style={styles.explainHeader}>{text}</h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative" as const,
    width: "468.4px",
    height: "350px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    position: "absolute" as const,
    width: "400.91px",
    height: "260px",
    objectFit: "cover" as const,
    zIndex: "4",
  },

  text: {
    position: "absolute" as const,
    zIndex: "5",
    color: "white",
    fontFamily: "Assistant",
    fontWeight: "bold",
    textAlign: "center" as const,
    width: "400.91px",
    height: "260px",
    bottom: "30px",
    left: "67.5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  explainHeader: {
    fontSize: "70px",
    margin: "0px",
    padding: "0px",
    textAlign: "center" as const,
  },
};

export default ExplainPictures;
