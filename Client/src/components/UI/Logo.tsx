import smarketingLogo from '../../assets/Smarketing.png';

interface LogoProps {
  size: string;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div>
      <a href="#">
        <img
          style={{ ...styles, width: size }}
          src={smarketingLogo}
          alt="Smarketing Logo"
          className="logo"
        />
      </a>
    </div>
  );
};

const styles = {
  flexShrink: "0" as const,
};

export default Logo;
