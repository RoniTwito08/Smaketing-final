// CampaignDetailsPopup.tsx

import React from "react";
import styles from "./CampaignDetailsPopup.module.css";
import { IoMdAnalytics } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaRegCirclePause } from "react-icons/fa6";
import { config } from "../../config";

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
          <button className={styles.closeBtn} onClick={onClose} data-tooltip="סגור">
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {campaign.landingPage ? (
            <iframe
              src ={`${config.apiUrl}/landingPages/${campaign.landingPage}`}
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
          <button
            className={styles.submitBtn}
            onClick={onSubmit}
            data-tooltip="שלח"
          >
            <IoIosSend />
          </button>
          <button
            className={styles.AnalyticsBtn}
            data-tooltip="גרפים ואנליטיקות"
          >
            <IoMdAnalytics />
          </button>
          <button
            className={styles.deleteBtn}
            data-tooltip="מחק"
          >
            <MdDeleteOutline />
          </button>
          <button
            className={styles.pauseBtn}
            data-tooltip="השהה"
          >
            <FaRegCirclePause />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPopup;
