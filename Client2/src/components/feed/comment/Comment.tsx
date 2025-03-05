import React from "react";
import { CommentType } from "../types";
import "./Comment.css";

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className="comment">
      <span className="comment-user">{comment.user.name}</span>: {comment.text}
    </div>
  );
};

export default Comment;
