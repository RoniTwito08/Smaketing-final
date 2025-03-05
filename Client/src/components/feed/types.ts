import { User } from '../../types/user';
export { User };

export interface CommentType {
  id: string;
  text: string;
  user: User;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  comments: CommentType[];
}
