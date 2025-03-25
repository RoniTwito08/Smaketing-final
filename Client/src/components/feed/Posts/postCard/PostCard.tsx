import React, { useEffect, useState } from "react";
import { Post, CommentType } from "../../types";
import PostHeader from "../postHeader/PostHeader";
import PostImage from "../postImage/PostImage";
import PostActions from "../postActions/PostActions";
import CommentSection from "../../Comments/commentSection/CommentSection";
import { useAuth } from "../../../../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PostCard.css";
import CommentModal from "../../Comments/commentModal/CommentModal";
import { EditPostModal } from "../../../../pages/userProfileScreen/EditPostModal";
import { fetchComments } from "../../api";
import NoImagePlaceholder from "../../../../assets/No-Image-Placeholder.svg";
import { config } from "../../../../config";
const PostCard: React.FC<{
  post: Post;
  onDelete: (postId: string) => void;
}> = ({ post, onDelete }) => {
  const [comments, setComments] = useState(post.comments ?? []);
  const { user, accessToken } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  // Fix incorrect image URL format:
  const correctedImage = post.image ? post.image.replace("//", "/") : null;

  useEffect(() => {
    fetchComments(post._id).then((comments) => {
      setComments(comments);

    });
  }, [post._id]);

  const handleDelete = async () => {
    try {
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      const response = await fetch(`${config.apiUrl}/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        onDelete(post._id);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleNewComment = (newComment: CommentType) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteComment = (newComment: CommentType) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== newComment._id)
    );
  };

  const checkUser = () => {
    const postUserId =
      typeof post.senderId === "object" ? post.senderId : post.senderId;

    if (user?._id && postUserId) {
      const isEqual = user._id === postUserId;
      return isEqual;
    }
    return false;
  };

  const fetchUserPosts = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/posts/user/${user._id}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      await response.json();
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleModalClose = () => {
    fetchComments(post._id).then(() => {
    });
    setIsCommentModalOpen(false);
  };

  return (
    <>
      <div className={`post-card ${correctedImage ? "has-image" : "no-image"}`}>
        {checkUser() && (
          <div className="post-actions edit-delete-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditModalOpen(true)}
            >
              <FaEdit />
            </button>
            <button className="delete-btn">
              <FaTrash onClick={handleDelete} />
            </button>
          </div>
        )}

        <PostHeader senderId={post.senderId} />

        {correctedImage ? (
          <PostImage image={correctedImage} />
        ) : (
          <div className="post-image no-image">
            <img
              src={NoImagePlaceholder}
              alt="No Image Available"
              className="no-image-placeholder"
              style={{ width: 400, height: 250, alignItems: "center" }}
            />
          </div>
        )}

        <p className="post-description">
          {post.postData || "No description available."}
        </p>
        <PostActions
          postId={post._id}
          commentCount={comments.length || 0}
          userId={user?._id}
          onCommentClick={() => setIsCommentModalOpen(true)}
        />
        <CommentSection
          comments={comments}
          onViewAll={() => setIsCommentModalOpen(true)}
        />
      </div>

      <EditPostModal
        post={post}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fetchUserPosts={fetchUserPosts}
      />

      <CommentModal
        open={isCommentModalOpen}
        onClose={handleModalClose}
        imageUrl={correctedImage || ""}
        postId={post?._id}
        onNewComment={handleNewComment}
        onDeleteComment={handleDeleteComment}
      />
    </>
  );
};

export default PostCard;
