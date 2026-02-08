// frontend/src/components/TaskForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '@/types/api-types';

interface TaskFormProps {
  onSubmit: (task: TaskCreate | TaskUpdate) => void;
  onCancel: () => void;
  initialData?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialData?.due_date || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setCompleted(initialData.completed);
      setPriority(initialData.priority);
      setDueDate(initialData.due_date || '');
      setTags(initialData.tags?.join(', ') || '');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const taskData = {
        title,
        description,
        completed,
        priority,
        due_date: dueDate || null,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };
      onSubmit(taskData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-scale-in">
      <div>
        <label htmlFor="title" className="block text-caption font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Task Title
        </label>
        <div className="relative group">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`block w-full px-6 py-5 glass rounded-2xl text-white placeholder-zinc-500 focus-ring text-title transition-all duration-300 hover-scale-sm ${
              errors.title ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20'
            }`}
            placeholder="What needs to get done?"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              title.trim() ? 'gradient-premium' : 'bg-zinc-600'
            }`}>
              {title.trim() && (
                <svg className="w-3.5 h-3.5 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
        {errors.title && (
          <p className="mt-4 text-caption text-red-400 flex items-center gap-2 animate-scale-in">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-caption font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Details <span className="text-zinc-400 font-normal">(Add context, links, or notes)</span>
        </label>
        <div className="relative group">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="block w-full px-6 py-5 glass rounded-2xl text-white placeholder-zinc-500 focus-ring text-body transition-all duration-300 hover-scale-sm resize-none"
            placeholder="Add any additional information..."
          />
          <div className="absolute top-6 right-6 pointer-events-none">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              description.trim() ? 'gradient-premium' : 'bg-zinc-600'
            }`}>
              {description.trim() && (
                <svg className="w-3.5 h-3.5 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="priority" className="block text-caption font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Priority Level
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['low', 'medium', 'high', 'urgent'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPriority(level)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 capitalize hover-scale-sm ${
                priority === level
                  ? level === 'urgent' ? 'gradient-error text-white shadow-lg' :
                    level === 'high' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' :
                    level === 'medium' ? 'gradient-warning text-white shadow-lg' :
                    'gradient-success text-white shadow-lg'
                  : 'glass-interactive text-white/70 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-caption font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due Date <span className="text-zinc-400 font-normal">(Optional)</span>
        </label>
        <div className="relative group">
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="block w-full px-6 py-5 glass rounded-2xl text-white focus-ring hover-scale-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:scale-110 transition-all duration-300"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-caption font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Tags <span className="text-zinc-400 font-normal">(Comma separated)</span>
        </label>
        <div className="relative group">
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full px-6 py-5 glass rounded-2xl text-white placeholder-zinc-500 focus-ring hover-scale-sm"
            placeholder="work, urgent, personal..."
          />
        </div>
      </div>

      {initialData && (
        <div className="flex items-center p-6 glass-interactive rounded-2xl group hover:border-violet-400/40 transition-all duration-300">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-6 w-6 rounded-xl border-2 border-violet-400 text-violet-600 focus-ring focus:ring-offset-0 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-110"
          />
          <label htmlFor="completed" className="ml-4 block text-caption font-medium text-white cursor-pointer flex items-center gap-3">
            <span>Mark as completed</span>
            {completed && (
              <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </label>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 inline-flex items-center justify-center px-8 py-5 glass-interactive hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 focus-ring hover-lift"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center px-8 py-5 gradient-premium hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-violet-500/30 transform hover:scale-[1.02] transition-all duration-300 focus-ring-premium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {initialData ? (
            <>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Update Task
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
