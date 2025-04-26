import Feed from "./components/Feed";
import "./MainFeed.css";

export const MainFeed = () => {
  return (
    <div className="main-feed-container">
      <div className="main-feed">
        <Feed />
      </div>
    </div>
  );
};

export default MainFeed;
