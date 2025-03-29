// Sidebar.tsx
import { motion } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoDesktopSharp } from "react-icons/io5";
import { IoIosRemoveCircleOutline, IoIosColorFilter, IoIosCloudDone, IoIosOptions } from "react-icons/io";
import { AiOutlineFontColors, AiOutlineExclamationCircle } from "react-icons/ai";
import { FaTimes, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import styles from "../CampaignForm/landingPageStyles.module.css";
import { useState } from "react";
import ColorCombo from "./ColorCombo/ColorCombo";
import { colorComboData } from "./sideBarData";
import Font from "./Fonts/Font";
import { FontData } from "./sideBarData";
import Chat from "./Chat/Chat";

interface RemovedSection {
  section: any;
  index: number;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOk: () => void;
  onColorChange: (
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string,
    textColor: string
  ) => void;
  onFontChange: (font: string) => void;
  removedSections: RemovedSection[];
  onRestore: (item: RemovedSection) => void;
  onResponsiveChange: (view: "desktop" | "tablet" | "mobile" | "") => void;
  setShowMobilePopup: (val: boolean) => void;
  setShowTabletPopup: (val: boolean) => void;
  setShowDesktopPopup: (val: boolean) => void;
}

const Sidebar = ({
  isOpen,
  setIsOpen,
  onOk,
  onColorChange,
  onFontChange,
  removedSections,
  onRestore,
  onResponsiveChange,
  setShowMobilePopup,
  setShowTabletPopup,
  setShowDesktopPopup,
}: SidebarProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [_responsiveView, setResponsiveView] = useState<"desktop" | "tablet" | "mobile" | "">("");

  const handleIconClick = (icon: string) => {
    if (icon === "chat") {
      setSelectedIcon(icon === selectedIcon ? null : icon);
      setIsOpen(true);
    } else if (icon === "ok") {
      onOk();
    } else if (icon === "responsive") {
      setSelectedIcon(icon === selectedIcon ? null : icon);
      setIsOpen(true);
      setResponsiveView("");
      onResponsiveChange("");
    } else {
      setIsOpen(true);
      setSelectedIcon(icon === selectedIcon ? null : icon);
    }
  };

  const handleClickColorChange = (
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string,
    textColor: string
  ) => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
    document.documentElement.style.setProperty("--tertiary-color", tertiaryColor);
    document.documentElement.style.setProperty("--text-color", textColor);
    onColorChange(primaryColor, secondaryColor, tertiaryColor, textColor);
  };

  const handleClickFontChange = (font: string) => {
    document.documentElement.style.setProperty("--font", font);
    onFontChange(font);
  };

  return (
    <>
      <motion.div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        initial={{ width: "3%" }}
        animate={{ width: isOpen ? "20%" : "5%" }}
        transition={{ duration: 0.9 }}
      >
        <div className={styles.sidebarHeader}>
          {isOpen && (
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              <FaTimes size={25} />
            </button>
          )}
        </div>
        <nav className={styles.sidebarMenu}>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("actions")}>
            <AiOutlineExclamationCircle size={30} />
            {isOpen && <span>Actions</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("color")}>
            <IoIosColorFilter size={30} />
            {isOpen && <span>Colors</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("font")}>
            <AiOutlineFontColors size={30} />
            {isOpen && <span>Fonts</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("removeSection")}>
            <IoIosRemoveCircleOutline size={30} />
            {isOpen && <span>Sections removed</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("chat")}>
            <IoChatbubbleEllipsesOutline size={30} />
            {isOpen && <span>Chat</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("responsive")}>
            <MdOutlinePhoneIphone size={30} />
            {isOpen && <span>Responsive</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("marketingTone")}>
            <IoIosOptions size={30} />
            {isOpen && <span>Marketing tone</span>}
          </div>
          <div className={styles.sidebarItem} onClick={() => handleIconClick("ok")}>
            <IoIosCloudDone size={30} />
            {isOpen && <span>Ok, create this landing page</span>}
          </div>
        </nav>
        {isOpen && <div className={styles.divider}></div>}
        {isOpen && (
          <div className={styles.subMenuContainer}>
            {selectedIcon === "responsive" && (
              <div className={styles.responsiveExplanation}>
                <p>בחרו את התצוגה הרצויה:</p>
                <div className={styles.responsiveDevices}>
                  <div
                    className={styles.devicePreview}
                    onClick={() => {
                      setResponsiveView("desktop");
                      onResponsiveChange("desktop");
                      setShowDesktopPopup(true);
                    }}
                  >
                    <IoDesktopSharp size={40} />
                    <p>Desktop</p>
                  </div>
                  <div
                    className={styles.devicePreview}
                    onClick={() => {
                      setResponsiveView("tablet");
                      onResponsiveChange("tablet");
                      setShowTabletPopup(true);
                    }}
                  >
                    <FaTabletAlt size={40} />
                    <p>Tablet</p>
                  </div>
                  <div
                    className={styles.devicePreview}
                    onClick={() => {
                      setResponsiveView("mobile");
                      onResponsiveChange("mobile");
                      setShowMobilePopup(true);
                    }}
                  >
                    <FaMobileAlt size={40} />
                    <p>Mobile</p>
                  </div>
                </div>
              </div>
            )}
            {selectedIcon === "actions" && (
              <div className={styles.actionsExplanation}>
                <p>
                  ברוכים הבאים למערכת שלנו – כאן תוכלו לעשות כל מה שתמיד חלמתם עליו עבור דף הנחיתה שלכם!
                </p>
                <ul>
                  <li>לשנות את הסדר של הסקשנים ולהתאים את מיקום האובייקטים, כולל שינוי מיקום הסקשן ההירו.</li>
                  <li>להתאים את צבעי הדף בעזרת קולור קומבו מותאם לעסק שלכם, לשדר מקצועיות ואווירה ייחודית.</li>
                  <li>לבחור את הפונט המושלם שמתאים לאופי ולמסר של העסק שלכם.</li>
                  <li>להוסיף או למחוק סקשנים בקלות, כך שתמיד יהיה לכם דף נחיתה עדכני ונגיש.</li>
                  <li>לשנות את הטקסטים כך שיתאימו בדיוק לצרכים שלכם – ואפילו לקבל הצעות ייעול טקסטואלי.</li>
                  <li>להנות מתצוגה רספונסיבית שמתאימה למובייל, דסקטופ וטאבלט.</li>
                  <li>להתאים את הטון השיווקי ולהעביר את המסר בצורה מקצועית ומושכת.</li>
                </ul>
                <p>בואו להפוך את דף הנחיתה שלכם לכלי שיווקי עוצמתי ומותאם אישית!</p>
              </div>
            )}
            {selectedIcon === "color" && (
              <div className={styles.subMenuColors}>
                {colorComboData.map((colorCombo, index) => (
                  <ColorCombo
                    key={index}
                    {...colorCombo}
                    onColorComboSelect={() =>
                      handleClickColorChange(
                        colorCombo.primaryColor,
                        colorCombo.secondaryColor,
                        colorCombo.tertiaryColor,
                        colorCombo.textColor
                      )
                    }
                  />
                ))}
              </div>
            )}
            {selectedIcon === "font" && (
              <div className={styles.subMenuFonts}>
                {FontData.map((font, index) => (
                  <Font
                    key={index}
                    {...font}
                    onFontSelect={() => handleClickFontChange(font.font)}
                  />
                ))}
              </div>
            )}
            {selectedIcon === "chat" && (
              <div style={{ marginTop: "10px", width: "100%" }}>
                <Chat />
              </div>
            )}
            {selectedIcon === "removeSection" && (
              <div className={styles.removedSections}>
                <p>סקשנים שהוסרו:</p>
                {removedSections.length === 0 ? (
                  <div className={styles.removedSection}>
                    <p>אין סקשנים מוסרים.</p>
                  </div>
                ) : (
                  <div>
                    {removedSections.map((item, idx) => (
                      <div key={idx} className={styles.removedSection}>
                        <p>{item.section.sectionName}</p>
                        <button onClick={() => onRestore(item)}>שחזר</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {selectedIcon === "marketingTone" && (
              <div className={styles.marketingToneExplanation}>
                <p>בחרו את הסגנון המתאים לעסק שלכם:</p>
                <div className={styles.marketingToneOptions}>
                  <div className={styles.toneOption}>
                    <p>צעיר ומודרני</p>
                  </div>
                  <div className={styles.toneOption}>
                    <p>פורמלי ומקצועי</p>
                  </div>
                  <div className={styles.toneOption}>
                    <p>חמים ואישי</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </motion.div>
    </>
  );
};

export default Sidebar;
