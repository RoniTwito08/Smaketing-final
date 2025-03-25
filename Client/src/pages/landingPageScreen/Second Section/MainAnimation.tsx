import Lottie from "lottie-react";
import animationData from "../../../assets/Animation.json";

const MainAnimation: React.FC = ({}) => {
  return (
    <Lottie animationData={animationData} style={{ width: 600 }} loop={true} />
  );
};

export default MainAnimation;
