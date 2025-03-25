import { useInfiniteQuery } from "@tanstack/react-query";
import { config } from "../../../config";
const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `${config.apiUrl}/posts?page=${pageParam}&limit=6`
  );

  if (!res.ok) throw new Error("Failed to fetch posts");

  const data = await res.json();

  return {
    posts: data.posts,
    nextPage: data.hasMore ? pageParam + 1 : undefined,
  };
};

export const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
