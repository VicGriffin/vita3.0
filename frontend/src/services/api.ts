import api from '@/lib/api';

// User Profile
export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/api/users/${userId}/profile`);
  return response.data.data;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const response = await api.put(`/api/users/${userId}/profile`, data);
  return response.data.data;
};

export const updateUserSettings = async (userId: string, settings: any) => {
  const response = await api.put(`/api/users/${userId}/settings`, settings);
  return response.data.data;
};

// Emergency Services
export const requestEmergencyAssistance = async (data: {
  location: { lat: number; lng: number };
  type: string;
  description: string;
}) => {
  const response = await api.post('/api/emergency/assist', data);
  return response.data.data;
};

export const getNearbyHospitals = async (location: {
  lat: number;
  lng: number;
}) => {
  const response = await api.get('/api/emergency/locations', {
    params: location,
  });
  return response.data.data;
};

// Community
export const getCommunityPosts = async (page = 1, limit = 10) => {
  const response = await api.get('/api/community/posts', {
    params: { page, limit },
  });
  return response.data.data;
};

export const createCommunityPost = async (data: {
  title: string;
  content: string;
  tags?: string[];
}) => {
  const response = await api.post('/api/community/posts', data);
  return response.data.data;
};

// Reminders
export const getReminders = async () => {
  const response = await api.get('/api/reminders');
  return response.data.data;
};

export const createMedicationReminder = async (data: {
  medication: string;
  schedule: string;
  dosage: string;
}) => {
  const response = await api.post('/api/reminders/medications', data);
  return response.data.data;
};

export const createAppointmentReminder = async (data: {
  title: string;
  date: string;
  doctor?: string;
  notes?: string;
}) => {
  const response = await api.post('/api/reminders/appointments', data);
  return response.data.data;
};
