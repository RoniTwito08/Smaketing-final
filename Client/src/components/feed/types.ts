import { User } from "../../types/user";
export interface CommentType {
  _id: string;
  userId: string;
  commentData: string;
  postId: string;
  fullName: string;

  profilePicture?: string;
}

export interface Post {
  _id: string;
  senderId: string;
  postData: string;
  comments: CommentType[];
  image?: string;
  likes?: User[];
}
