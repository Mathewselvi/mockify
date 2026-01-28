import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    // Read directly from DOM to ensure sync
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg backdrop-blur-sm"
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun size={20} className="stroke-2" /> : <Moon size={20} className="stroke-2 text-indigo-600" />}
        </button>
    );
};

export default ThemeToggle;
