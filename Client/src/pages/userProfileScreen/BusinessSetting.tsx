import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./AccountSettings.css";
import { useAuth } from "../../context/AuthContext";
import { businessInfoService } from "../../services/besinessInfo.service";
import { FormValues } from "../../types/businessInfo";
import { toast } from "react-toastify";
import { config } from "../../config";

export const BusinessSetting = () => {
  const { user, accessToken } = useAuth();
  const [formData, setFormData] = useState<Partial<FormValues>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!user?._id || !accessToken) return;
      try {
        const data = await businessInfoService.getBusinessInfo(
          user._id,
          accessToken
        );
        setFormData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching business info", err);
        toast.error("שגיאה בשליפת מידע עסקי");
      }
    };

    fetchBusinessInfo();
  }, [user, accessToken]);

  const handleChange = (field: keyof FormValues, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData._id || !accessToken) return;
    try {
      await businessInfoService.updateBusinessInfo(
        formData._id,
        formData,
        accessToken
      );
      toast.success("פרטי העסק עודכנו בהצלחה");
    } catch (err) {
      console.error("Error updating business info", err);
      toast.error("שגיאה בעדכון פרטי העסק");
    }
  };

  if (isLoading) return <Typography>טוען פרטי עסק...</Typography>;

  return (
    <div className="profileContainer">
      <div className="userInfo">
        <div className="userDetails">
          <div className="nameSection">
            <h2>{formData.businessName}</h2>
          </div>

          {[
            ["כתובת:", "businessAddress"],
            ["סוג עסק:", "businessType"],
            ["תחום פעילות:", "businessField"],
            ["פרטים נוספים:", "businessFieldDetails"],
            ["איזור שירות:", "serviceAreas"],
            ["פלח שוק:", "specificMarketSegment"],
            ["לקוחות טיפוסיים:", "typicalCustomers"],
            ["העדפות עיצוב:", "designPreferences"],
          ].map(([label, key]) => (
            <div className="businessFieldRow" key={key}>
              <label htmlFor={key}>{label}</label>
              <input
                id={key as string}
                name={key as string}
                value={(formData as any)[key] || ""}
                onChange={(e) =>
                  handleChange(key as keyof FormValues, e.target.value)
                }
              />
            </div>
          ))}

          <div className="businessFieldRow">
            <label htmlFor="targetAudience">קהל יעד:</label>
            <input
              id="targetAudience"
              name="targetAudience"
              value={`${formData.ageGroup || ""}, ${formData.gender || ""}`}
              onChange={(e) => {
                const [ageGroup, gender] = e.target.value.split(",");
                setFormData((prev) => ({
                  ...prev,
                  ageGroup: ageGroup?.trim(),
                  gender: gender?.trim(),
                }));
              }}
            />
          </div>

          {[
            "serviceDescription",
            "uniqueService",
            "specialPackages",
            "incentives",
          ].map((key) => (
            <div className="businessFieldRow" key={key}>
              <label htmlFor={key}>{key}:</label>
              <textarea
                id={key}
                name={key}
                value={(formData as any)[key] || ""}
                onChange={(e) =>
                  handleChange(key as keyof FormValues, e.target.value)
                }
              />
            </div>
          ))}

          <div className="businessFieldRow">
            <label htmlFor="socialMediaAccounts">רשתות חברתיות:</label>
            <input
              id="socialMediaAccounts"
              name="socialMediaAccounts"
              value={(formData.socialMediaAccounts || []).join(", ")}
              onChange={(e) =>
                handleChange(
                  "socialMediaAccounts",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
            />
          </div>

          <div className="businessFieldRow">
            <label htmlFor="logoFile">לוגו:</label>
            <input
              type="file"
              id="logoFile"
              name="logoFile"
              accept="image/*"
              onChange={(e) =>
                handleChange("logoFile", e.target.files?.[0] || null)
              }
            />
          </div>
          {formData.logo && (
            <img
              src={`${config.apiUrl}/${formData.logo}`}
              alt="לוגו"
              style={{ maxWidth: "100px", marginTop: "10px" }}
            />
          )}
          <div className="businessFieldRow">
            <label htmlFor="businessImageFiles">תמונות נוספות של העסק:</label>
            <input
              type="file"
              id="businessImageFiles"
              name="businessImageFiles"
              accept="image/*"
              multiple
              onChange={(e) =>
                handleChange("businessImageFiles", e.target.files)
              }
            />
          </div>
          {formData.businessImages && formData.businessImages.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {formData.businessImages.map((imgPath, i) => (
                <img
                  key={i}
                  src={`${config.apiUrl}/${imgPath}`}
                  alt={`business-img-${i}`}
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                />
              ))}
            </div>
          )}

          <div className="businessFieldRow">
            <label htmlFor="objective">מטרה לקמפיין:</label>
            <select
              id="objective"
              name="objective"
              value={formData.objective || ""}
              onChange={(e) => handleChange("objective", e.target.value)}
            >
              <option value="">בחר מטרה</option>
              <option value="brandAwareness">הגדלת מודעות למותג</option>
              <option value="reach">הגעה לאנשים רבים</option>
              <option value="siteVisit">ביקור באתר</option>
              <option value="engagement">מעורבות</option>
              <option value="videoViews">צפיות בווידאו</option>
              <option value="sales">הגדלת מכירות</option>
            </select>
          </div>

          <button className="saveButton" onClick={handleSave}>
            שמור שינויים
          </button>
        </div>
      </div>
    </div>
  );
};
