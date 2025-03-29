import React, { useState, useEffect } from "react";
import { Post } from "../../../components/feed/types";
import PostCard from "../../../components/feed/Posts/postCard/PostCard";
import CampaignPopup from "../../LandingPageGenerator/CampaignForm/CampaignForm"; // נתיב לקובץ שיצרנו קודם
import "./Feed.css";
import MyCampaigns from "../../Campaigns/MyCampaigns";

const Feed: React.FC<{ posts: Post[]; className?: string }> = ({
  posts,
  className,
}) => {
  const [postList, setPostList] = useState<Post[]>(posts);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const handleDeletePost = (postId: string) => {
    setPostList((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleCampaignSubmit = (data: any) => {
    console.log("Campaign submitted:", data);
  };

  return (
    <div className={`feed ${className || ""}`}>
      {postList.length > 0 ? (
        postList.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
        ))
      ) : (
        <div>
        <button className="noPostsButton" onClick={() => setShowPopup(true)}>
          צור קמפיין
        </button>
        <MyCampaigns />
        </div>
      )}

      <CampaignPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleCampaignSubmit}
      />
    </div>
  );
};

export default Feed;
