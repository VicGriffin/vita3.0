import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface Location {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'emergency';
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  operatingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  services: string[];
  rating?: number;
  distance?: number; // Distance from user's location in kilometers
}

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyLocations(userLocation);
    }
  }, [userLocation]);

  const getUserLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (err) {
      setError('Failed to get user location. Some features may be limited.');
    }
  };

  const fetchNearbyLocations = async (location: { latitude: number; longitude: number }) => {
    try {
      const response = await endpoints.locations.nearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: 10 // 10km radius
      });
      setLocations(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch nearby locations');
    } finally {
      setLoading(false);
    }
  };

  const searchLocations = async (query: string) => {
    try {
      setLoading(true);
      const response = await endpoints.locations.search(query);
      setLocations(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations');
    } finally {
      setLoading(false);
    }
  };

  const filterByType = async (type: Location['type']) => {
    try {
      setLoading(true);
      const response = await endpoints.locations.filter({ type });
      setLocations(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter locations');
    } finally {
      setLoading(false);
    }
  };

  return {
    locations,
    loading,
    error,
    userLocation,
    searchLocations,
    filterByType,
    refreshLocations: () => userLocation && fetchNearbyLocations(userLocation),
  };
}
