import React from "react";
import Comment from "../comment/Comment";
import AddComment from "../addComment/AddComment";
import { CommentType } from "../../feed/types";
import "./CommentSection.css";

const CommentSection: React.FC<{
  comments: CommentType[];
  postId: string;
  onAddComment: (text: string) => void;
}> = ({ comments, postId, onAddComment }) => {
  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <AddComment onAddComment={onAddComment} />
    </div>
  );
};

export default CommentSection;
