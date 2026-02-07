// frontend/src/lib/auth.ts
import { UserRegister, UserLogin, Token } from '@/types/api-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const authService = {
  async register(user: UserRegister): Promise<Token> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }
    return response.json();
  },

  async login(user: UserLogin): Promise<Token> {
    const formData = new FormData();
    formData.append('username', user.email);
    formData.append('password', user.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
    return response.json();
  },

  async logout(): Promise<void> {
    // Remove token from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
};