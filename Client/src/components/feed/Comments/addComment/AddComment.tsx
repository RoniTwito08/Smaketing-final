import React from "react";
import "./AddComment.css";

const AddComment: React.FC<{ onAddComment: (comment: string) => void }> = ({
  onAddComment,
}) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default AddComment;
