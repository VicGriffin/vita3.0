import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface EmergencyRequest {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  type: string;
  description?: string;
  userId: string;
  createdAt: string;
}

export function useEmergency() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await endpoints.emergency.list();
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emergency requests');
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (data: Omit<EmergencyRequest, 'id' | 'userId' | 'createdAt' | 'status'>) => {
    try {
      const response = await endpoints.emergency.create(data);
      setRequests(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create emergency request');
      throw err;
    }
  };

  const updateRequest = async (id: string, data: Partial<EmergencyRequest>) => {
    try {
      const response = await endpoints.emergency.update(id, data);
      setRequests(prev => prev.map(request => 
        request.id === id ? response.data : request
      ));
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update emergency request');
      throw err;
    }
  };

  return {
    requests,
    loading,
    error,
    createRequest,
    updateRequest,
    refreshRequests: fetchRequests,
  };
}
