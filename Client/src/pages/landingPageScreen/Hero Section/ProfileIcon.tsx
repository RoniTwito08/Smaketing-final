import { useNavigate } from "react-router-dom";
import ProfileSvg from "../../../assets/profile.svg"; // ייבוא ה-SVG כקומפוננטה

const ProfileIcon: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginSignupClick = () => {
    // אם המשתמש מחובר
    // TODO

    //אם המשתמש לא מחובר
    navigate("/forms");
  };

  return (
    <div>
      <button onClick={handleLoginSignupClick} aria-label="התחבר/הרשם">
        <img
          src={ProfileSvg}
          alt="Profile Icon"
          className="profile"
          style={{ width: "30px" }}
          onClick={handleLoginSignupClick}
        />
      </button>
    </div>
  );
};

export default ProfileIcon;
