import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styles from "./UserProfile.module.css";
import { CreatePostModal } from "./CreatePostModal";
import FeedPage from "../feedPage/Feed";
import { mockPosts as initialMockPosts } from "../../mockData/mockPost";
import { Post, User } from "../../components/feed/types";

export const MyPosts = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const currentUser: User = {
    id: "current123",
    name: "דן כהן",
    profilePicture: "https://placehold.co/150x150",
  };

  useEffect(() => {
    if (!initialized) {
      setLocalPosts(initialMockPosts);
      setInitialized(true);
    }
  }, [initialized]);

  const handleCreatePost = (
    postData: string,
    image?: File,
    userName?: string
  ) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user: {
        id: `user-${Date.now()}`,
        name: userName || "משתמש אנונימי",
        profilePicture: "https://placehold.co/150x150",
      },
      image: image
        ? URL.createObjectURL(image)
        : "https://picsum.photos/400/300",
      comments: [],
    };

    setLocalPosts((prevPosts) => {
      console.log("Previous posts:", prevPosts);
      return [newPost, ...prevPosts];
    });
    setIsCreateModalOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.postsSection}>
        <div className={styles.sectionHeader}>
          <h3>הפוסטים שלי</h3>
          <button
            className={styles.createPostButton}
            onClick={() => setIsCreateModalOpen(true)}
          >
            צור פוטס
          </button>
        </div>
        <FeedPage posts={localPosts} className={styles.feed} />
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};
