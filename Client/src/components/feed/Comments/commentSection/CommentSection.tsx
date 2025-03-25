import React from "react";
import { CommentType } from "../../types";
import Comment from "../comment/Comment";
import "./CommentSection.css";

const CommentSection: React.FC<{
  comments: CommentType[];
  onViewAll: () => void;
}> = ({ comments, onViewAll }) => {
  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <>
          <p className="no-comments">אין תגובות עדיין</p>
          <button className="add-comment" onClick={onViewAll}>
            הוספת תגובה...
          </button>
        </>
      ) : (
        <>
          <Comment comment={comments[0]} />

          {comments.length > 1 ? (
            <button className="view-all-comments" onClick={onViewAll}>
              צפייה בכל {comments.length} התגובות
            </button>
          ) : (
            <button className="add-comment" onClick={onViewAll}>
              הוספת תגובה...
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentSection;
