// frontend/src/components/TaskList.tsx
import React from 'react';
import { Task } from '@/types/api-types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500/15 to-purple-600/15 glass-interactive flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-gentle-float">
          <svg className="w-16 h-16 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-headline text-white mb-4 gradient-text">Your workspace is ready</h3>
        <p className="text-body text-zinc-400 max-w-lg mx-auto leading-relaxed">Start organizing your tasks and boost your productivity. Create your first task to begin!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div key={task.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <TaskItem 
            task={task} 
            onDelete={onDelete} 
            onToggleComplete={onToggleComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
