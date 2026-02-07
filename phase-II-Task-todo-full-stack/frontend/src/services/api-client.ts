// api-client.ts
import { Task, TaskCreate, TaskUpdate, ApiError } from '../types/api-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// JWT token management
let accessToken: string | null = null;

export const setAuthToken = (token: string) => {
  accessToken = token;
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (!accessToken && typeof window !== 'undefined') {
    accessToken = localStorage.getItem('auth_token');
  }
  return accessToken;
};

export const clearAuthToken = () => {
  accessToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

async function callApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      ...headers,
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    // Try to parse error, fallback to status text
    let errorMessage = 'API request failed';
    try {
      const errorData: ApiError = await response.json();
      errorMessage = errorData.detail ? JSON.stringify(errorData.detail) : errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content for DELETE operations
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// Create a simple axios-like interface for easier migration
export const apiClient = {
  get: <T>(endpoint: string) => callApi<T>(endpoint),
  post: <T>(endpoint: string, data?: any) => callApi<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  }),
  patch: <T>(endpoint: string, data?: any) => callApi<T>(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  }),
  put: <T>(endpoint: string, data?: any) => callApi<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  }),
  delete: <T>(endpoint: string) => callApi<T>(endpoint, {
    method: 'DELETE',
  }),
};

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    return callApi<Task[]>('tasks');
  },

  getTask: async (taskId: string): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}`);
  },

  createTask: async (task: TaskCreate): Promise<Task> => {
    return callApi<Task>('tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  updateTask: async (taskId: string, task: TaskUpdate): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  },

  deleteTask: async (taskId: string): Promise<void> => {
    return callApi<void>(`tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  completeTask: async (taskId: string): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}/complete`, {
      method: 'PATCH',
    });
  },
};

export const authService = {
  login: async (email: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    setAuthToken(data.access_token);
    return data;
  },

  register: async (email: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Registration failed');
    }

    const data = await response.json();
    setAuthToken(data.access_token);
    return data;
  },

  logout: () => {
    clearAuthToken();
  },
};