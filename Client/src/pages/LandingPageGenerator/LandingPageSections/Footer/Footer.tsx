// Footer.tsx
import { useState, useEffect } from 'react';
import footerStyles from './footer.module.css';
import {
  FaInstagramSquare,
  FaFacebookF,
  FaTiktok,
  FaLinkedin
} from "react-icons/fa";
import { businessInfoService } from '../../../../services/besinessInfo.service';
import { useAuth } from '../../../../context/AuthContext';

interface FooterProps {
  contactInfo: string;
  location: string;
  copyRight: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  linkedin?: string;
  other?: string;
}

const Footer = ({ contactInfo, location, copyRight }: FooterProps) => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const { user, accessToken } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !accessToken) return;

    businessInfoService
      .getBusinessInfo(userId, accessToken)
      .then(data => {
        setSocialLinks(data.data.socialLinks || {});
      })
      .catch(err => console.error(err));
  }, [userId, accessToken]);

  if (!userId || !accessToken) return null;

  return (
    <footer className={footerStyles.footerSection}>
      <div className={footerStyles.footerContainer}>
        <div className={footerStyles.footerInfo}>
          <p>{contactInfo}</p>
          <p>{location}</p>
        </div>
        <div className={footerStyles.socialMediaContainer}>
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={footerStyles.socialMediaIcon} />
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagramSquare className={footerStyles.socialMediaIcon} />
            </a>
          )}
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebookF className={footerStyles.socialMediaIcon} />
            </a>
          )}
          {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
              <FaTiktok className={footerStyles.socialMediaIcon} />
            </a>
          )}
        </div>
      </div>
      <p className={footerStyles.copyRight}>{copyRight}</p>
    </footer>
  );
};

export default Footer;
