import React from "react";
import styles from "./CampaignDetailsPopup.module.css";

interface CampaignDetailsPopupProps {
  campaign: any;
  onClose: () => void;
  onSubmit: () => void;
}

const CampaignDetailsPopup: React.FC<CampaignDetailsPopupProps> = ({ campaign, onClose, onSubmit }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>{campaign.campaignName}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {campaign.landingPage ? (
            <iframe
              src={`http://localhost:3000/landingPages/${campaign.landingPage}`}
              title="Landing Page Preview"
              className={styles.landingPageIframe}
              frameBorder="0"
            ></iframe>
          ) : (
            <div className={styles.landingPagePreview}>
              <p>לא נמצא דף נחיתה</p>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button className={styles.submitBtn} onClick={onSubmit}>
            שגר קמפיין
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPopup;
