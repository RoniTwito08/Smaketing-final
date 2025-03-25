import React, { useState } from "react";
import "./PostImage.css";
import { config } from "../../../../config";
const PostImage: React.FC<{ image?: string | null }> = ({ image }) => {
  const [error, setError] = useState(false);

  const noUploadPlaceholder =
    "https://placehold.co/600x400?text=No+Image+Uploaded";

  const notFoundPlaceholder =
    "https://placehold.co/600x400?text=Image+Not+Found";

  const correctedImage =
    !image || image === "null"
      ? noUploadPlaceholder
      : image.startsWith("http")
        ? image.replace("//", "/")
        : `${config.apiUrl}/${image.replace("//", "/")}`;

  return (
    <img
      src={error ? notFoundPlaceholder : correctedImage}
      alt="Post"
      crossOrigin="anonymous" //  Helps with CORS issues
      className="post-image"
      onError={() => {
        console.error("❌ Image failed to load:", correctedImage);
        setError(true);
      }}
    />
  );
};

export default PostImage;
