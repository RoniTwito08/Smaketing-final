import React, { useState } from "react";
import "./PostActions.css";

const PostActions: React.FC<{ postId: string; commentCount: number }> = ({
  postId,
  commentCount,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="post-actions">
      <button
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        {liked ? "❤️" : "🤍"} {likes}
      </button>
      <button>💬 {commentCount}</button>
    </div>
  );
};

export default PostActions;
