import { useState } from "react";
import headerStyles from "./header.module.css";

interface HeaderProps {
  businessName: string;
  logo: string;
  title: string;
  buttonText: string;
}

function Header({ businessName, logo, title, buttonText }: HeaderProps) {
  const [logoPreview, setLogoPreview] = useState(logo);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setLogoPreview(imageUrl);
    }
  };

  return (
    <div className={headerStyles.headerWrapper}>
      <section className={headerStyles.headerSectionContainer}>
        <div className={headerStyles.logoContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className={headerStyles.uploadInput}
            id="logo-upload"
          />
          <label htmlFor="logo-upload" className={headerStyles.uploadLabel}>
            {logoPreview ? (
              <img src={logoPreview} alt={title || "Section Logo"} className={headerStyles.logo} />
            ) : (
              <span className={headerStyles.uploadText}>בחר לוגו</span>
            )}
          </label>
        </div>
        <h1 className={headerStyles.businessName}>{businessName}</h1>
        <h2 className={headerStyles.sectionTitle}>{title}</h2>
        <div className={headerStyles.headerButtonContainer}>
          <a href="#contactUs">
            <button className={headerStyles.headerSectionButton}>{buttonText}</button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Header;
