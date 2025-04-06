import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface Profile {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  medicalInfo: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
    emergencyContacts?: {
      name: string;
      relationship: string;
      phone: string;
    }[];
  };
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await endpoints.profile.get();
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      const response = await endpoints.profile.update(data);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const updateMedicalInfo = async (data: Partial<Profile['medicalInfo']>) => {
    try {
      const response = await endpoints.profile.updateMedicalInfo(data);
      setProfile(prev => prev ? { ...prev, medicalInfo: { ...prev.medicalInfo, ...response.data } } : null);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update medical info');
      throw err;
    }
  };

  const updatePreferences = async (data: Partial<Profile['preferences']>) => {
    try {
      const response = await endpoints.profile.updatePreferences(data);
      setProfile(prev => prev ? { ...prev, preferences: { ...prev.preferences, ...response.data } } : null);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateMedicalInfo,
    updatePreferences,
    refreshProfile: fetchProfile,
  };
}
