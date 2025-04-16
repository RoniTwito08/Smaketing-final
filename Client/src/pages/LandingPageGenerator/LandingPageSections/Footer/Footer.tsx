// Footer.tsx
import { useState, useEffect } from 'react';
import footerStyles from './footer.module.css';
import {
  FaInstagramSquare,
  FaTwitter,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";
import { businessInfoService } from '../../../../services/besinessInfo.service';
import { useAuth } from '../../../../context/AuthContext';

interface FooterProps {
  contactInfo: string;
  location: string;
  copyRight: string;
}

const Footer = ({ contactInfo, location, copyRight }: FooterProps) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const { user, accessToken } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !accessToken) return;

    businessInfoService
      .getBusinessInfo(userId, accessToken)
      .then(data => {
        setAccounts(data.data.socialMediaAccounts || []);
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
          {accounts.includes('Twitter') && <FaTwitter className={footerStyles.socialMediaIcon} />}
          {accounts.includes('Instagram') && <FaInstagramSquare className={footerStyles.socialMediaIcon} />}
          {accounts.includes('Facebook') && <FaFacebookF className={footerStyles.socialMediaIcon} />}
          {accounts.includes('TikTok') && <FaTiktok className={footerStyles.socialMediaIcon} />}
        </div>
      </div>
      <p className={footerStyles.copyRight}>{copyRight}</p>
    </footer>
  );
};

export default Footer;
