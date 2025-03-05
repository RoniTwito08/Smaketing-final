import React from "react";
import "./PostImage.css";

const PostImage: React.FC<{ image: string }> = ({ image }) => {
  return <img src={image} alt="Post" className="post-image" />;
};

export default PostImage;
