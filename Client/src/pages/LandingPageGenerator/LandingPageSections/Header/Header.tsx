import  { useState, useEffect } from "react";
import headerStyles from "./header.module.css";
import { useAuth } from "../../../../context/AuthContext";
import { businessInfoService } from "../../../../services/besinessInfo.service";
import { config } from "../../../../config";

interface HeaderProps {
  businessName: string;
  title: string;
  buttonText: string;
}

function Header({ businessName, title, buttonText }: HeaderProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { user, accessToken } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (userId && accessToken && !logoPreview) {
      businessInfoService
        .getBusinessInfo(userId, accessToken)
        .then((data) => {
          if (data.data.logo) {
            setLogoPreview(config.apiUrl + "/" + data.data.logo);
          }
          console.log("Business info fetched successfully:", config.apiUrl + data.logo);
        })
        .catch((err) => {
          console.error("Failed to fetch business info:", err);
        });
    }
  }, [userId, accessToken, logoPreview]);

  if (!userId || !accessToken) return null;

  return (
    <div className={headerStyles.headerWrapper}>
      <section className={headerStyles.headerSectionContainer}>
        <div className={headerStyles.logoContainer}>
          {logoPreview ? (
            <img
              src={logoPreview}
              alt={title || "Section Logo"}
              className={headerStyles.logo}
            />
          ) : (
            <span className={headerStyles.uploadText}>אין לוגו להציג</span>
          )}
        </div>
        <h1 className={headerStyles.businessName}>{businessName}</h1>
        <h2 className={headerStyles.sectionTitle}>{title}</h2>
        <div className={headerStyles.headerButtonContainer}>
          <a href="#contactUs">
            <button className={headerStyles.headerSectionButton}>
              {buttonText}
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Header;
