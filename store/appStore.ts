import { create } from "zustand";

type Post = {
  id: string;
  title: string;
  body: string;
};

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (
    id: string,
    updatedPost: { title: string; body: string },
  ) => void;
  deletePost: (id: string) => void;
  clearPosts: () => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post,
      ),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),

  clearPosts: () => set({ posts: [] }),
}));
