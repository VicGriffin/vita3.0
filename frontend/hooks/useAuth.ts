import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await auth.getProfile();
        setUser(data);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data } = await auth.login({ email, password });
      localStorage.setItem('token', data.token);
      await checkAuth();
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const { data } = await auth.signup({ email, password, name });
      localStorage.setItem('token', data.token);
      await checkAuth();
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
