// frontend/src/components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-violet-400/30 border-t-violet-500"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
      <p className="mt-4 text-white/80 text-lg font-medium animate-pulse">Getting things ready...</p>
    </div>
  );
};

export default Loading;
