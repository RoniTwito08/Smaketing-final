import React from "react";

const NoImagePlaceholder: React.FC<{ commentText?: string }> = ({
  commentText,
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {commentText && (
        <text
          x="50%"
          y="60%"
          fontSize="18"
          fontFamily="Arial, sans-serif"
          fill="#333"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {commentText}
        </text>
      )}
    </svg>
  );
};

export default NoImagePlaceholder;
