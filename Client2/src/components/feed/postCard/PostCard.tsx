import React, { useState } from "react";
import { Post } from "../types";
import PostHeader from "../postHeader/PostHeader";
import PostImage from "../postImage/PostImage";
import PostActions from "../postActions/PostActions";
import CommentSection from "../commentSection/CommentSection";
import "./PostCard.css";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [comments, setComments] = useState(post.comments);

  const handleAddComment = (text: string) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      text,
      user: "You",
    };
    //fix the user type
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="post-card">
      <PostHeader user={post.user} />
      <PostImage image={post.image} />
      <PostActions postId={post.id} commentCount={comments.length} />
      <CommentSection
        comments={comments}
        postId={post.id}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostCard;
