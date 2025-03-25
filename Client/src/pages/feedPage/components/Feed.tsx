import React, { useState, useEffect } from "react";
import { Post } from "../../../components/feed/types";
import PostCard from "../../../components/feed/Posts/postCard/PostCard";
import "./Feed.css";

const Feed: React.FC<{ posts: Post[]; className?: string }> = ({
  posts,
  className,
}) => {
  const [postList, setPostList] = useState<Post[]>(posts);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const handleDeletePost = (postId: string) => {
    setPostList((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className={`feed ${className || ""}`}>
      {postList.length > 0 ? (
        postList.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
        ))
      ) : (
        <p className="no-posts">אין פוסטים להצגה</p>
      )}
    </div>
  );
};

export default Feed;
