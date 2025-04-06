import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  postId: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await endpoints.comments.list(postId);
      setComments(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string) => {
    try {
      const response = await endpoints.comments.create(postId, { content });
      setComments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create comment');
      throw err;
    }
  };

  const updateComment = async (commentId: string, content: string) => {
    try {
      const response = await endpoints.comments.update(commentId, { content });
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId ? { ...comment, ...response.data } : comment
        )
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update comment');
      throw err;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await endpoints.comments.delete(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
      throw err;
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      const response = await endpoints.comments.like(commentId);
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                likes: response.data.likes,
                isLiked: response.data.isLiked,
              }
            : comment
        )
      );
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like comment');
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    refreshComments: fetchComments,
  };
}
