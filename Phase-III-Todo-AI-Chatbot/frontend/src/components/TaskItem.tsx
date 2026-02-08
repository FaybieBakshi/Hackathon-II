// frontend/src/components/TaskItem.tsx
import React from 'react';
import Link from 'next/link';
import { Task } from '@/types/api-types';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getDueDateStatus = (dueDate: string | null) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-400' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-orange-400' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-yellow-400' };
    if (diffDays <= 7) return { text: `Due in ${diffDays} days`, color: 'text-gray-400' };
    return { text: `Due ${due.toLocaleDateString()}`, color: 'text-gray-400' };
  };

  return (
    <li className={`group glass rounded-2xl p-6 transition-all duration-500 hover-lift ${
      task.completed 
        ? 'border-white/10 opacity-75' 
        : 'border-white/20 hover:border-violet-400/40'
    } animate-scale-in`}>
      <div className="flex items-start space-x-4 flex-1">
        <div className="relative pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-6 w-6 rounded-xl border-2 text-violet-600 focus-ring focus:ring-offset-0 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:border-violet-400"
            style={{
              borderColor: task.completed ? '#8b5cf6' : '#6b7280'
            }}
          />
          {task.completed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-in">
              <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <Link href={`/tasks/${task.id}`} className="flex-1 group/link">
              <span className={`text-title cursor-pointer transition-all duration-300 font-semibold ${
                task.completed 
                  ? 'line-through text-zinc-500' 
                  : 'text-white hover:text-violet-300 group-hover/link:translate-x-2 inline-block'
              }`}>
                {task.title}
              </span>
              {task.description && (
                <p className={`text-caption mt-3 line-clamp-2 transition-colors duration-300 ${
                  task.completed ? 'text-zinc-600' : 'text-zinc-400 group-hover/link:text-zinc-300'
                }`}>
                  {task.description}
                </p>
              )}
            </Link>
            
            {/* Priority Badge */}
            <div className={`px-3 py-1.5 rounded-full text-caption font-semibold border capitalize hover-scale-sm ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </div>
          </div>

          {/* Tags and Due Date */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-caption bg-violet-500/15 text-violet-300 border border-violet-500/25 hover-scale-sm hover:bg-violet-500/25 transition-all duration-200"
              >
                #{tag}
              </span>
            ))}
            {task.due_date && (
              <div className={`flex items-center gap-1.5 text-caption font-medium ${getDueDateStatus(task.due_date)?.color} hover-lift px-3 py-1.5 rounded-lg border border-current/20`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {getDueDateStatus(task.due_date)?.text}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
        <Link href={`/tasks/edit/${task.id}`}>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-caption font-semibold transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 glass-interactive text-violet-300 hover:text-violet-200 hover-scale-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-caption font-semibold transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 hover:border-red-500/40 hover-scale-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
