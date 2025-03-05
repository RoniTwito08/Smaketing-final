import React from "react";
import { Post } from "../../components/feed/types";
import PostCard from "../../components/feed/postCard/PostCard";
import "./Feed.css";

const FeedPage: React.FC<{ posts: Post[]; className?: string }> = ({ posts, className }) => {
  return (
    <div className={`feed ${className || ''}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedPage;
