interface LogoProps {
  size: string;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div>
      <a href="#">
        <img
          style={{ ...styles, width: size }} // עדכון הרוחב בהתאם ל-prop
          src="src/assets/Smarketing.png"
          alt="Smarketing Logo"
          className="logo"
        />
      </a>
    </div>
  );
};

const styles = {
  flexShrink: "0" as const, // למנוע שינוי גודל בעת שימוש ב-flex
};

export default Logo;
