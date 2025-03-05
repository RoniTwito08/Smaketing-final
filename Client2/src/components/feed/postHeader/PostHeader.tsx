import React from "react";
import { User } from "../../feed/types";
import "./PostHeader.css";

const PostHeader: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="post-header">
      <img
        src={user.profilePicture}
        alt={user.fullName}
        className="profile-picture"
      />
      <span className="user-name">{user.fullName}</span>
    </div>
  );
};

export default PostHeader;
