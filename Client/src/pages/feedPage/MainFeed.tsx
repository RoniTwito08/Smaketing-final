import { useFetchPosts } from "./hooks/useFetchPosts";
import Feed from "./components/Feed";
import "./MainFeed.css";

export const MainFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useFetchPosts();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className="main-feed-container">
      <div className="main-feed">
        {error && <p>Error loading posts</p>}
        <Feed posts={posts} />
      </div>

      {isFetchingNextPage && <div className="loader">Loading more...</div>}

      {hasNextPage && !isFetchingNextPage && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={() => fetchNextPage()}>
            טען עוד פוסטים
          </button>
        </div>
      )}
    </div>
  );
};

export default MainFeed;
