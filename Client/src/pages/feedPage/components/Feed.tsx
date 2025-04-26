import React, { useState } from "react";
import CampaignPopup from "../../LandingPageGenerator/CampaignForm/CampaignForm"; // נתיב לקובץ שיצרנו קודם
import "./Feed.css";
import MyCampaigns from "../../Campaigns/MyCampaigns";

const Feed: React.FC<{ className?: string }> = ({ className }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCampaignSubmit = (data: any) => {
    console.log("Campaign submitted:", data);
  };

  return (
    <div className={`feed ${className || ""}`}>
      <div>
        <button className="noPostsButton" onClick={() => setShowPopup(true)}>
          צור קמפיין
        </button>
        <MyCampaigns />
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
