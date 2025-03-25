import Logo from "../../../components/UI/Logo";
import ProfileIcon from "./ProfileIcon";

const HeroSection: React.FC = () => {
  return (
    <div style={styles.container} className="hero-section">
      <Logo size="300px" />
      <ProfileIcon />
    </div>
  );
};

const styles = {
  container: {
    margin: "0px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // מבטיח מרחק בין האלמנטים
    padding: "0 20px",
    boxSizing: "border-box" as const,
  },
  headerMenuWrapper: {
    position: "absolute" as const, // ממקם את HeaderMenu במיקום קבוע
    left: "50%", // ממרכז אופקית
    transform: "translateX(-50%)", // מוודא שהמרכז הוא בדיוק במרכז המסך
  },
};

export default HeroSection;
