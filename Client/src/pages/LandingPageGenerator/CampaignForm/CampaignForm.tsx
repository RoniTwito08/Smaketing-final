import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { DropResult, DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SectionRenderer from "./sectionRendering"; 
import Sidebar from "../SideBar/sideBar"; 
import MobileView from "../SideBar/MobileView/MobileView"; 
import TabletView from "../SideBar/TabletView/TabletView"; 
import DesktopView from "../SideBar/DesktopView/DesktopView"; 
import styles from "./landingPageStyles.module.css";
import "./CampaignForm.css";
import { useAuth } from "../../../context/AuthContext";

interface CampaignForm {
  creatorId: string;
  campaignName: string;
  campaignContent: string;
  budget: number;
  marketingLevel: string;
  campaginPurpose: string;
  actionToCall: string;
  targetAudience: string;
  targetGender: string;
  language: string;
  targetLocation: string;
  targetAge: string;
  campaignImage: File | null;
}

interface RemovedSection {
  section: any;
  index: number;
}

interface CampaignPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: CampaignForm) => void;
}

const CampaignPopup: React.FC<CampaignPopupProps> = ({ open, onClose, onSubmit }) => {
  const { user } = useAuth();
  if (!user || !user._id) {
    throw new Error("User is not authenticated or userId is missing");
  }
  const [form, setForm] = useState<CampaignForm>({
    creatorId: "1234567890",
    campaignName: "קמפיין אביב 2025",
    campaignContent: "קמפיין מיוחד לעונת האביב עם הנחות בלעדיות למוצרים נבחרים!",
    budget: 5000,
    marketingLevel: "גבוה",
    campaginPurpose: "הגברת מודעות למותג",
    actionToCall: "הצטרפו עכשיו",
    targetAudience: "לקוחות חדשים ומתעניינים",
    targetGender: "שני המינים",
    language: "עברית",
    targetLocation: "ישראל",
    targetAge: "25-45",
    campaignImage: null, 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [landingPageData, setLandingPageData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [colors, setColors] = useState({
    primaryColor: "#ffffff",
    secondaryColor: "#ffffff",
    tertiaryColor: "#ffffff",
    textColor: "#000000",
  });

  const [userFont, setUserFont] = useState("sans-serif");
  const [removedSections, setRemovedSections] = useState<RemovedSection[]>([]);
  const [responsiveView, setResponsiveView] = useState<"desktop" | "tablet" | "mobile" | "">("");
  const landingPageRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement | null>;
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [showTabletPopup, setShowTabletPopup] = useState(false);
  const [showDesktopPopup, setShowDesktopPopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const businessInfo = await fetch(`http://localhost:3000/business-info/${user._id}`,{
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!businessInfo.ok) {
      setError("שגיאה בהבאת מידע עסקי");
      return;
    }
    const BusinessData = await businessInfo.json();
    if (!BusinessData) {
      setError("שגיאה בהבאת מידע עסקי");
      return;
    }
    console.log("Business Data:", BusinessData);
    const userEmail = await fetch(`http://localhost:3000/users/${user._id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!userEmail.ok) {
      setError("שגיאה בהבאת מידע עסקי");
      return;
    }
    const userEmailData = await userEmail.json();
    if (!userEmailData) {
      setError("שגיאה בהבאת מידע עסקי");
      return;
    }
    document.body.style.overflow = "auto"; // מחזיר את הגלילה
    console.log("User Email Data:", userEmailData.email);
    try {
      const response = await fetch("http://localhost:3000/landing-page-generator/generateLandingPageContext", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignInfo: form,
          BusinessData: BusinessData,
          UserEmailData: userEmailData.email,
        }),
        
      });
      if (!response.ok) throw new Error("שגיאה ביצירת דף הנחיתה");
      const data = await response.json();
      console.log("Landing Page Data:", data);
      if (data) {
        const sectionsArray = Object.keys(data).map((key) => data[key]);
        setLandingPageData(sectionsArray);
        setSubmitted(true);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message || "שגיאה בלתי צפויה");
      else setError("שגיאה בלתי צפויה");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (landingPageData) {
      console.log("Landing Page Data:", landingPageData);
    }
  }, [landingPageData]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newSections = Array.from(landingPageData);
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);
    setLandingPageData(newSections);
  };

  const handleColorChange = (
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string,
    textColor: string
  ) => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
    document.documentElement.style.setProperty("--tertiary-color", tertiaryColor);
    document.documentElement.style.setProperty("--text-color", textColor);
    setColors({ primaryColor, secondaryColor, tertiaryColor, textColor });
  };

  const handleFontChange = (font: string) => {
    document.documentElement.style.setProperty("--font", font);
    setUserFont(font);
  };

  const handleSaveLandingPage = async () => {
    setIsSidebarOpen(false);
    setTimeout(async () => {
      if (!landingPageRef.current) return;
      const clone = landingPageRef.current.cloneNode(true) as HTMLElement;
      const resizeHandles = clone.querySelectorAll("[data-resize-handle]");
      resizeHandles.forEach((el) => el.remove());
      const landingPageHTML = clone.innerHTML;
      const completeHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Landing Page</title>
            <link rel="stylesheet" href="http://localhost:3000/dist/assets/index-uoALyoE3.css">
            <style>
              :root {
                --primary-color: ${colors.primaryColor};
                --secondary-color: ${colors.secondaryColor};
                --tertiary-color: ${colors.tertiaryColor};
                --text-color: ${colors.textColor};
                --font: ${userFont};
              }
            </style>
          </head>
          <body>
            ${landingPageHTML}
          </body>
        </html>
      `;
      try {
        const response = await fetch("http://localhost:3000/api/saveLandingPage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            html: completeHTML,
            userPrimaryColor: colors.primaryColor,
            userSecondaryColor: colors.secondaryColor,
            userTertiaryColor: colors.tertiaryColor,
            userTextColor: colors.textColor,
            userFont: userFont,
          }),
        });
        if (response.ok) alert("Landing page saved successfully!");
        else alert("Error saving landing page");
      } catch (error) {
        console.error("Error saving landing page:", error);
        alert("Error saving landing page");
      }
    }, 500);
  };

  const handleDelete = (index: number, section: any) => {
    setRemovedSections((prev) => [...prev, { section, index }]);
    setLandingPageData((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  const handleRestore = (item: RemovedSection) => {
    setLandingPageData((prev: any[]) => {
      const newSections = [...prev];
      newSections.splice(item.index, 0, item.section);
      return newSections;
    });
    setRemovedSections((prev) => prev.filter((rs) => rs !== item));
  };

  const handleResponsiveChange = (view: "desktop" | "tablet" | "mobile" | "") => {
    setResponsiveView(view);
  };

  if (!open) return null;

  return (
    <div>
      {loading && <p className="text-blue-500">🔄 טוען... נא להמתין</p>}
      {error && <p className="text-red-500">❌ {error}</p>}
  
      {submitted && landingPageData ? (
        <div className="popup-overlay">
          <div
            className="popup popup-landing"
            dir="rtl"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              width: "95%",
            }}
          >
            <div className="popup-header"
            style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <button className="cancel-btn" onClick={onClose}>
                ❌ סגור
              </button>
              <button className="cancel-btn" onClick={onClose}>
                אישור ✅
              </button>
            </div>
  
            <div className={styles.landingPageLayout}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div
                      className={`${styles.sectionsContainer} ${
                        isSidebarOpen ? styles.withSidebar : ""
                      } ${responsiveView ? styles[responsiveView] : ""}`}
                      ref={(node) => {
                        if (node) {
                          landingPageRef.current = node;
                          provided.innerRef(node);
                        }
                      }}
                      {...provided.droppableProps}
                    >
                      {landingPageData.map((section: any, index: number) => (
                        <Draggable
                          key={section.sectionName + index}
                          draggableId={section.sectionName + index}
                          index={index}
                          isDragDisabled={["header", "hero", "footer"].includes(
                            section.sectionName || ""
                          )}
                        >
                          {(providedDraggable) => (
                            <div
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                            >
                              <SectionRenderer
                                section={section}
                                onDeleteSection={() => handleDelete(index, section)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
  
              <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                onOk={handleSaveLandingPage}
                onColorChange={handleColorChange}
                onFontChange={handleFontChange}
                removedSections={removedSections}
                onRestore={handleRestore}
                onResponsiveChange={handleResponsiveChange}
                setShowMobilePopup={setShowMobilePopup}
                setShowTabletPopup={setShowTabletPopup}
                setShowDesktopPopup={setShowDesktopPopup}
              />
  
              {responsiveView === "mobile" && showMobilePopup && (
                <MobileView onClose={() => setShowMobilePopup(false)}>
                  <div className={styles.sectionsContainer}>
                    {landingPageData.map((section: any, index: number) => (
                      <SectionRenderer key={index} section={section} />
                    ))}
                  </div>
                </MobileView>
              )}
  
              {responsiveView === "tablet" && showTabletPopup && (
                <TabletView onClose={() => setShowTabletPopup(false)}>
                  <div className={styles.sectionsContainer}>
                    {landingPageData.map((section: any, index: number) => (
                      <SectionRenderer key={index} section={section} />
                    ))}
                  </div>
                </TabletView>
              )}
  
              {responsiveView === "desktop" && showDesktopPopup && (
                <DesktopView onClose={() => setShowDesktopPopup(false)}>
                  <div className={styles.sectionsContainer}>
                    {landingPageData.map((section: any, index: number) => (
                      <SectionRenderer key={index} section={section} />
                    ))}
                  </div>
                </DesktopView>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-overlay-form">
          <div className="popup-form" dir="rtl">
            <h2>צור קמפיין חדש</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input name="campaignName" placeholder="שם הקמפיין" onChange={handleChange} />
                <input type="number" name="budget" placeholder="תקציב" onChange={handleChange} />
                <input name="marketingLevel" placeholder="רמת שיווק" onChange={handleChange} />
                <input name="campaginPurpose" placeholder="מטרת הקמפיין" onChange={handleChange} />
                <input name="actionToCall" placeholder="קריאה לפעולה" onChange={handleChange} />
                <input name="targetAudience" placeholder="קהל יעד" onChange={handleChange} />
                <input name="targetGender" placeholder="מין קהל היעד" onChange={handleChange} />
                <input name="language" placeholder="שפה" onChange={handleChange} />
                <input name="targetLocation" placeholder="מיקום יעד" onChange={handleChange} />
                <input name="targetAge" placeholder="גיל יעד" onChange={handleChange} />
                <textarea name="campaignContent" placeholder="תיאור הקמפיין" onChange={handleChange} />
              </div>
  
              <div className="popup-actions">
                <button className="cancel-btn" type="button" onClick={onClose}>
                  ביטול
                </button>
                <button className="submit-btn" type="submit">
                  צור קמפיין
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default CampaignPopup;
