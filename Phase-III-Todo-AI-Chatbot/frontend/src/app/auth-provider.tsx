'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = authService.getToken();
    setToken(storedToken);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    setToken(result.access_token);
    authService.setToken(result.access_token);
  };

  const register = async (email: string, password: string) => {
    const result = await authService.register({ email, password });
    setToken(result.access_token);
    authService.setToken(result.access_token);
  };

  const logout = () => {
    setToken(null);
    authService.removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
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
