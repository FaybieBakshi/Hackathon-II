'use client';

import UserAuthStatus from "@/components/UserAuthStatus";
import MobileNavigation from "@/components/MobileNavigation";
import Link from "next/link";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Modern Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TaskFlow</span>
                  <span className="text-xs text-gray-400 tracking-wider hidden sm:block">ORGANIZE • ACHIEVE • GROW</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/tasks">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Tasks
                </button>
              </Link>
              <Link href="#features">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Features
                </button>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <UserAuthStatus />
              </div>
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 relative overflow-hidden mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TaskFlow</span>
                  <span className="text-xs text-gray-400 tracking-wider">ORGANIZE • ACHIEVE • GROW</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                The modern way to organize your tasks, boost productivity, and achieve your goals. Built for teams that care about efficiency.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/tasks" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>for productive teams</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}