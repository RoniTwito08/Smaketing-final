import { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { CreatePostModal } from "./CreatePostModal";
import Feed from "../feedPage/components/Feed";
import { Post } from "../../components/feed/types";
import { useAuth } from "../../context/AuthContext";
import { config } from "../../config";
export const MyPosts = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    fetchUserPosts();
  }, [user?._id]);

  const fetchUserPosts = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/posts/user/${user._id}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");

      const userPosts = await response.json();
      setLocalPosts(userPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.postsSection}>
        <div className={styles.sectionHeader}>
          <button
            className={styles.createPostButton}
            onClick={() => setIsCreateModalOpen(true)}
          >
            צור פוסט
          </button>
        </div>
        <Feed posts={localPosts} className={styles.feed} />
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        fetchUserPosts={fetchUserPosts}
      />
    </div>
  );
};
