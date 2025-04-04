import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
};

// Profile API
export const profile = {
  get: (id: string) => api.get(`/profile/${id}`),
  update: (id: string, data: { name?: string; email?: string }) =>
    api.patch(`/profile/${id}`, data),
  updateSettings: (id: string, data: { darkMode?: boolean; notifications?: boolean }) =>
    api.patch(`/settings/${id}`, data),
};

// Medical Profile API
export const medical = {
  createProfile: (data: {
    bloodType?: string;
    allergies: string[];
    conditions: string[];
    medications: string[];
  }) => api.post('/medical/profile', data),
  getProfile: (id: string) => api.get(`/medical/profile/${id}`),
  updateProfile: (
    id: string,
    data: {
      bloodType?: string;
      allergies?: string[];
      conditions?: string[];
      medications?: string[];
    }
  ) => api.patch(`/medical/profile/${id}`, data),
  createEmergencyContact: (data: {
    name: string;
    phone: string;
    relationship: string;
  }) => api.post('/medical/emergency/contact', data),
  getEmergencyContacts: (id: string) =>
    api.get(`/medical/emergency/contact/${id}`),
  getFirstAidAssistance: (symptoms: string) =>
    api.get('/medical/emergency/assist', { params: { symptoms } }),
};

// Reminders API
export const reminders = {
  create: (data: {
    title: string;
    description?: string;
    datetime: Date;
    type: 'medication' | 'appointment';
  }) => api.post('/reminders', data),
  getAll: (id: string) => api.get(`/reminders/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/reminders/${id}`, { status }),
  delete: (id: string) => api.delete(`/reminders/${id}`),
};

export default api;
