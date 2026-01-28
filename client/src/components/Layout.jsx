import React from 'react';

import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">

            {/* Background Blobs - Standard Classes + Opacity */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/20 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-200">
                            M
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                            Mockify.
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                <p>Designed for <span className="text-indigo-600 dark:text-indigo-400">Excellence</span></p>
            </footer>
        </div>
    );
};

export default Layout;
