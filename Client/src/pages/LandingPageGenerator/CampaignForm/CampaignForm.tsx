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
import { IoRocketOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

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

const CampaignPopup: React.FC<CampaignPopupProps> = ({ open, onClose /*, onSubmit*/ }) => {
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

  useEffect(() => {
    if (landingPageRef.current) {
      landingPageRef.current.style.fontFamily = userFont;
    }
  }, [userFont]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const businessInfo = await fetch(`http://localhost:3000/business-info/${user._id}`, {
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
    document.body.style.overflow = "auto";
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
    if (submitted && landingPageData) {
      // theme מגיע באינדקס 8
      const theme = landingPageData[8] as {
        primaryColor: string;
        secondaryColor: string;
        tertiaryColor: string;
        font: string;
      };
  
      // מגדירים משתני CSS גלובליים
      document.documentElement.style.setProperty(
        "--primary-color",
        theme.primaryColor.trim()
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        theme.secondaryColor.trim()
      );
      document.documentElement.style.setProperty(
        "--tertiary-color",
        theme.tertiaryColor.trim()
      );
      // אין textColor ב־theme, אפשר לוותר או להגדיר ברירת־מחדל
      // document.documentElement.style.setProperty("--text-color", "#333");
  
      // מגדירים פונט גלובלי
      document.documentElement.style.setProperty(
        "--font",
        theme.font.trim()
      );
  
      // שאר אתחול הדף
    }
  }, [submitted, landingPageData]);
  

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
  
    // נשמור קודם את תוכן ה־body (ל־preview) ונבנה את ה־HTML המלא רק לצורך השמירה
    setTimeout(async () => {
      if (!landingPageRef.current) return;
  
      // 1. clone landing page container בלבד (לצורך preview)
      const clone = landingPageRef.current.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("[data-resize-handle]").forEach(el => el.remove());
      const landingPageHTML = clone.innerHTML;
  
      // 3. build complete HTML only for saving
      const completeHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Landing Page</title>
      <link rel="stylesheet" href="http://localhost:3000/dist/assets/index-C0XqnHoo.css">
      <style>
        :root {
          --primary-color: ${colors.primaryColor};
          --secondary-color: ${colors.secondaryColor};
          --tertiary-color: ${colors.tertiaryColor};
          --text-color: ${colors.textColor};
          --font: ${userFont};
        }
        body {
          font-family: ${userFont} !important;
        }
      </style>
    </head>
    <body>
      ${landingPageHTML}ֿ
      <script type="module" src="http://localhost:3000/dist/assets/index-C0XqnHoo.js"></script>
    </body>
  </html>
      `;
  
      // 4. לשמור לשרת
      try {
        const saveResponse = await fetch("http://localhost:3000/api/saveLandingPage", {
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
        if (!saveResponse.ok) {
          alert("Error saving landing page");
          return;
        }

        const savedLandingPage = await saveResponse.json();
  
        const campaignData = {
          ...form,
          creatorId: user._id,
          landingPage: savedLandingPage.file,
        };
  
        const campaignResponse = await fetch("http://localhost:3000/campaigns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(campaignData),
        });
        if (!campaignResponse.ok) {
          alert("Error saving campaign in DB");
          return;
        }
        const campaignResult = await campaignResponse.json();
        console.log("Campaign created:", campaignResult);
        
        alert("Landing page saved successfully!");
      } catch (error) {
        console.error(error);
        alert("Error saving landing page and campaign");
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

  // פונקציה לסגירת כל הפופאפים ואיפוס המצבים
  const handleClose = () => {
    setForm({ ...form, campaignName: "", campaignContent: "" });
    setLandingPageData(null);
    setSubmitted(false);
    setShowMobilePopup(false);
    setShowTabletPopup(false);
    setShowDesktopPopup(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div>
      
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
            <div className="popup-header">
              <p className="promptText">
                האם אתה מעוניין לשגר את דף הנחיתה?
              </p>
              <div className="buttonGroup">
                <button className="cancelBtn" onClick={handleClose}>
                  <MdCancel className="icon" />
                  <span>ביטול</span>
                </button>
                <button className="launchBtn" onClick={handleSaveLandingPage}>
                  <IoRocketOutline className="icon" />
                  <span>שגר קמפיין</span>
                </button>
              </div>
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
              <input
                name="campaignName"
                placeholder="שם הקמפיין"
                value={form.campaignName}
                onChange={handleChange}
              />

              <div className="form-group">
                <label>תקציב: {form.budget} ₪</label>
                <input
                  type="range"
                  name="budget"
                  min="1000"
                  max="20000"
                  step="500"
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>רמת שיווק</label>
                <select
                  name="marketingLevel"
                  value={form.marketingLevel}
                  onChange={handleChange}
                >
                  <option value="">בחר רמה</option>
                  <option value="נמוכה">נמוכה</option>
                  <option value="בינונית">בינונית</option>
                  <option value="גבוהה">גבוהה</option>
                </select>
              </div>

              <div className="form-group">
                <label>מטרת הקמפיין</label>
                <select
                  name="campaginPurpose"
                  value={form.campaginPurpose}
                  onChange={handleChange}
                >
                  <option value="">בחר מטרה</option>
                  <option value="הגברת מודעות למותג">הגברת מודעות למותג</option>
                  <option value="השגת לידים">השגת לידים</option>
                  <option value="קידום מכירות">קידום מכירות</option>
                </select>
              </div>

              <input
                name="actionToCall"
                placeholder="קריאה לפעולה"
                value={form.actionToCall}
                onChange={handleChange}
              />

              <div className="form-group">
                <label>קהל יעד</label>
                <select
                  name="targetAudience"
                  value={form.targetAudience}
                  onChange={handleChange}
                >
                  <option value="">בחר קהל</option>
                  <option value="לקוחות חדשים">לקוחות חדשים</option>
                  <option value="לקוחות קיימים">לקוחות קיימים</option>
                  <option value="עסקים">עסקים</option>
                </select>
              </div>

              <div className="form-group">
                <label>מין קהל היעד</label>
                <select
                  name="targetGender"
                  value={form.targetGender}
                  onChange={handleChange}
                >
                  <option value="">בחר מין</option>
                  <option value="גברים">גברים</option>
                  <option value="נשים">נשים</option>
                  <option value="שני המינים">שני המינים</option>
                </select>
              </div>

              <div className="form-group">
                <label>שפה</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                >
                  <option value="">בחר שפה</option>
                  <option value="עברית">עברית</option>
                  <option value="אנגלית">אנגלית</option>
                  <option value="ערבית">ערבית</option>
                </select>
              </div>

              <input
                name="targetLocation"
                placeholder="מיקום יעד"
                value={form.targetLocation}
                onChange={handleChange}
              />

              <input
                name="targetAge"
                placeholder="גיל יעד (למשל 25-45)"
                value={form.targetAge}
                onChange={handleChange}
              />

              <textarea
                name="campaignContent"
                placeholder="תיאור הקמפיין"
                value={form.campaignContent}
                onChange={handleChange}
              />
            </div>

  
              <div className="popup-actions">
                <button className="cancel-btn" type="button" onClick={handleClose}>
                  ביטול
                </button>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? (
                    <div className="btn-loader-wrapper">
                      <span className="loader loader-in-btn"></span>
                      טוען...
                    </div>
                  ) : (
                    "צור קמפיין"
                  )}
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
