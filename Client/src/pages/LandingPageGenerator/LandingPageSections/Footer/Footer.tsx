import footerStyles from './Footer.module.css';

interface FooterProps {
    logo: string;
    contactInfo: string;
    location: string;
    copyRight: string;
    socialMediaIcons?: string[]; 
}

const Footer = ({ contactInfo, location, copyRight, socialMediaIcons = [] }: FooterProps) => {
    return (
        <footer className={footerStyles.footerSection}>
            <div className={footerStyles.footerContainer}>

                <div className={footerStyles.footerInfo}>
                    <p>{contactInfo}</p>
                    <p>{location}</p>
                </div>

                {socialMediaIcons.length > 0 && (
                    <div className={footerStyles.socialMediaContainer}>
                        {socialMediaIcons.map((icon, index) => (
                            <img key={index} src={icon} alt={`Social ${index}`} className={footerStyles.socialMediaIcon} />
                        ))}
                    </div>
                )}
            </div>

            <p className={footerStyles.copyRight}>{copyRight}</p>
        </footer>
    );
};

export default Footer;
