import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/30 mb-8 backdrop-blur-sm">
              <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-sm text-white/90 font-medium">Smart Task Management</span>
            </div>

            {/* Main Title */}
            <h1 className="text-display mb-8 text-shadow-subtle">
              <span className="gradient-text-enhanced text-shadow-glow">
                Transform Your
              </span>
              <br />
              <span className="text-white">Productivity Flow</span>
            </h1>

            {/* Description */}
            <p className="text-body text-white/70 mb-12 max-w-3xl mx-auto animate-gentle-float">
              Experience the future of task management with AI-powered organization, seamless collaboration, and stunning design that makes productivity effortless.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/chat">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-title font-semibold transition-all focus-ring-premium disabled:pointer-events-none disabled:opacity-50 text-white h-14 rounded-2xl px-12 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 hover-scale glass-hover border-0 w-full sm:w-auto group shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20">
                  <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Try AI Assistant
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <Link href="/tasks">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-title font-medium transition-all focus-ring disabled:pointer-events-none disabled:opacity-50 border h-14 rounded-2xl px-12 w-full sm:w-auto glass-interactive text-white hover:text-violet-200">
                  <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Manage Tasks
                </button>
              </Link>
            </div>

            {/* Additional Links */}
            <div className="flex justify-center gap-6 mb-20">
              <Link href="/auth/login" className="text-white/70 hover:text-white text-sm transition-colors">
                Already have an account? Sign in
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group glass-interactive rounded-2xl p-6 hover-scale-sm">
                <div className="text-3xl md:text-4xl font-bold gradient-text animate-gentle-float">50M+</div>
                <div className="text-caption text-white/60 mt-2 uppercase tracking-wider">Tasks Organized</div>
              </div>
              <div className="text-center group glass-interactive rounded-2xl p-6 hover-scale-sm" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text-enhanced animate-gentle-float" style={{ animationDelay: "0.5s" }}>2M+</div>
                <div className="text-caption text-white/60 mt-2 uppercase tracking-wider">Global Users</div>
              </div>
              <div className="text-center group glass-interactive rounded-2xl p-6 hover-scale-sm" style={{ animationDelay: "0.4s" }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text animate-gentle-float" style={{ animationDelay: "1s" }}>99.99%</div>
                <div className="text-caption text-white/60 mt-2 uppercase tracking-wider">Uptime SLA</div>
              </div>
              <div className="text-center group glass-interactive rounded-2xl p-6 hover-scale-sm" style={{ animationDelay: "0.6s" }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text-enhanced animate-gentle-float" style={{ animationDelay: "1.5s" }}>4.9/5</div>
                <div className="text-caption text-white/60 mt-2 uppercase tracking-wider">Love Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-headline mb-6 text-white text-shadow-subtle">
              Built for the <span className="gradient-text-enhanced text-shadow-glow">Modern Workflow</span>
            </h2>
            <p className="text-body text-white/70 max-w-3xl mx-auto leading-relaxed">
              Revolutionary features that adapt to your work style, powered by AI and designed for seamless collaboration across teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Lightning Fast</h3>
              <p className="text-caption text-white/60 leading-relaxed">Experience zero latency with our optimized real-time sync technology. Your tasks update instantly across all devices.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Secure & Private</h3>
              <p className="text-caption text-white/60 leading-relaxed">Your data is protected with enterprise-grade encryption. Your tasks and information remain private and secure.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Team Collaboration</h3>
              <p className="text-caption text-white/60 leading-relaxed">Work together seamlessly with shared workspaces, real-time editing, and smart notifications for your team.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Mobile First</h3>
              <p className="text-caption text-white/60 leading-relaxed">Full-featured mobile app with offline support. Stay productive whether you&apos;re online or offline.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">AI Assistant</h3>
              <p className="text-caption text-white/60 leading-relaxed">Chat with our AI to manage tasks naturally using plain English. Add, complete, and organize tasks with simple conversations.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Smart Organization</h3>
              <p className="text-caption text-white/60 leading-relaxed">AI-powered categorization and smart filters help you find what you need instantly.</p>
            </div>

            <div className="glass-interactive rounded-2xl p-8 group animate-slide-in-right" style={{ animationDelay: "0.7s" }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-title mb-4 text-white">Beautiful Design</h3>
              <p className="text-caption text-white/60 leading-relaxed">A stunning interface that&apos;s a joy to use. Dark mode, custom themes, and accessibility baked in.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
