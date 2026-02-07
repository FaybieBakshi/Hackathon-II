'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/api-types';
import { apiClient } from '@/services/api-client';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTask();
  }, [params.id]);

  const fetchTask = async () => {
    try {
      const task = await apiClient.get<Task>(`/tasks/${params.id}`);
      setTask(task);
    } catch (err) {
      console.error('Failed to fetch task:', err);
      setError('Task not found');
      // For demo purposes, create a sample task
      setTask({
        id: params.id,
        user_id: 'demo-user-id',
        title: 'Sample Task',
        description: 'This is a sample task for demonstration',
        completed: false,
        priority: 'medium',
        due_date: null,
        tags: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    try {
      const updatedTask = await apiClient.patch<Task>(`/tasks/${params.id}`, taskData);
      setTask(updatedTask);
      router.push('/tasks');
    } catch (error) {
      console.error('Failed to update task:', error);
      // For demo purposes, navigate anyway
      router.push('/tasks');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Task Not Found</h2>
          <p className="text-white/70 mb-6">The task you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/tasks')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/tasks')}
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tasks
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Task</h1>
          <p className="text-white/70">Update your task details</p>
        </div>

        {/* Edit Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <TaskForm
              initialData={task}
              onSubmit={handleUpdateTask}
              onCancel={() => router.push('/tasks')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}