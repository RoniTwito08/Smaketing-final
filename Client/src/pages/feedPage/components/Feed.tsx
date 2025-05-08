import React, { useState } from "react";
import CampaignPopup from "../../LandingPageGenerator/CampaignForm/CampaignForm";
import "./Feed.css";
import MyCampaigns from "../../Campaigns/MyCampaigns";
import CampaignDetailsPopup from "../../Campaigns/CampaignDetailsPopup";

const Feed: React.FC<{ className?: string }> = ({ className }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshFeed, setRefreshFeed] = useState(false); // State for forcing re-render
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const handleCampaignSubmit = (data: any) => {
    console.log("Campaign submitted:", data);
    setRefreshFeed(true); // Trigger refresh of the feed
    // Refresh the feed immediately after a short timeout
    setTimeout(() => setRefreshFeed(false), 1000);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    console.log("Campaign deleted:", campaignId);
    setRefreshFeed(true); // Trigger refresh after deletion
    // Reset the refresh state
    setTimeout(() => setRefreshFeed(false), 1000);
  };

  const handleSelectCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
  };

  return (
    <div className={`feed ${className || ""}`}>
      <div>
        <button className="noPostsButton" onClick={() => setShowPopup(true)}>
          צור קמפיין
        </button>
        <MyCampaigns 
          onSelectCampaign={handleSelectCampaign} 
          key={refreshFeed ? Date.now() : ""} // Force re-render when `refreshFeed` changes
        />
      </div>

      <CampaignPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleCampaignSubmit}
      />
      {selectedCampaign && (
        <CampaignDetailsPopup
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSubmit={handleCampaignSubmit}
          onDelete={handleDeleteCampaign}
        />
      )}
    </div>
  );
};

export default Feed;
