'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors mobile-touch-target"
        aria-label="Toggle navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-slate-900 border-l border-white/10 transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              {/* Close button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <nav className="space-y-2">
                <Link href="/tasks" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    Tasks
                  </button>
                </Link>
                <Link href="#features" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    Features
                  </button>
                </Link>
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium">
                    Sign Up
                  </button>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}