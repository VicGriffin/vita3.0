import axios from 'axios';
import { auth } from '@clerk/nextjs';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Clerk session token
api.interceptors.request.use(
  async (config) => {
    try {
      const { getToken } = auth();
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error getting Clerk token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    me: () => api.get('/api/users/me'),
    updateProfile: (data: any) => api.put('/api/users/me/profile', data),
    updateSettings: (data: any) => api.put('/api/users/me/settings', data),
  },
  reminders: {
    list: () => api.get('/api/reminders'),
    create: (data: any) => api.post('/api/reminders', data),
    update: (id: string, data: any) => api.put(`/api/reminders/${id}`, data),
    delete: (id: string) => api.delete(`/api/reminders/${id}`),
  },
  community: {
    list: () => api.get('/api/community'),
    create: (data: any) => api.post('/api/community', data),
    update: (id: string, data: any) => api.put(`/api/community/${id}`, data),
    delete: (id: string) => api.delete(`/api/community/${id}`),
  },
  emergency: {
    create: (data: any) => api.post('/api/emergency', data),
    list: () => api.get('/api/emergency'),
    update: (id: string, data: any) => api.put(`/api/emergency/${id}`, data),
  },
};

export default api;
