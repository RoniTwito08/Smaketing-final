import React, { useState } from "react";
import CampaignPopup from "../../LandingPageGenerator/CampaignForm/CampaignForm"; // נתיב לקובץ שיצרנו קודם
import "./Feed.css";
import MyCampaigns from "../../Campaigns/MyCampaigns";

const Feed: React.FC<{ className?: string }> = ({ className }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshFeed, setRefreshFeed] = useState(false); // State חדש לשמירה

  const handleCampaignSubmit = (data: any) => {
    console.log("Campaign submitted:", data);
    setRefreshFeed(true); // עדכון ה-state כדי לעדכן את הפיד
    setTimeout(() => setRefreshFeed(false), 1000); // כדי לאפס את ה-state אחרי זמן קצר (אפשרות לשדרג בהמשך)
  };

  return (
    <div className={`feed ${className || ""}`}>
      <div>
        <button className="noPostsButton" onClick={() => setShowPopup(true)}>
          צור קמפיין
        </button>
        <MyCampaigns key={refreshFeed ? Date.now() : ""} /> {/* הרנדר מחדש של MyCampaigns */}
      </div>

      <CampaignPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleCampaignSubmit}
      />
    </div>
  );
};


export default Feed;
