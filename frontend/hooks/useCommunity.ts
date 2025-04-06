import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  comments: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      profilePicture?: string;
    };
  }>;
  likes: number;
  isAnswered: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useCommunity() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await endpoints.community.list();
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data: { title: string; content: string }) => {
    try {
      const response = await endpoints.community.create(data);
      setPosts(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    }
  };

  const updatePost = async (postId: string, data: Partial<Post>) => {
    try {
      const response = await endpoints.community.update(postId, data);
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, ...response.data } : post
        )
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      throw err;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await endpoints.community.delete(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refreshPosts: fetchPosts,
  };
}
