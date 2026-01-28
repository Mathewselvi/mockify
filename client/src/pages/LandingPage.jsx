import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startInterview } from '../api';
import { Loader2, ArrowRight, Sparkles, Zap } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        role: 'Frontend',
        experience: 'Fresher',
        questionCount: 5
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userId = new Date().getTime().toString();
            const { data } = await startInterview({ ...formData, userId });
            navigate(`/interview/${data._id}`, { state: { questionCount: formData.questionCount } });
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[70vh] animate-fade-in">
            {/* Left Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold shadow-sm backdrop-blur-sm">
                    <Sparkles size={16} /> Use AI to Land Your Dream Job
                </div>

                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                    Master the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 hover:to-indigo-500 transition-colors">
                        Technical Interview
                    </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Practice with realistic questions, get instant feedback, and improve your confidence. No sign-up required.
                </p>


            </div>

            {/* Right Card */}
            <div className="w-full max-w-md relative group">
                {/* Decorative glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                        <Zap className="text-indigo-600" fill="currentColor" /> Start Simulation
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Role</label>
                            <div className="relative">
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium appearance-none text-slate-900 dark:text-white"
                                >
                                    <option value="Frontend">Frontend Developer</option>
                                    <option value="Backend">Backend Developer</option>
                                    <option value="Full Stack">Full Stack Developer</option>
                                    <option value="HR">HR Interview</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Experience</label>
                            <div className="relative">
                                <select
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium appearance-none text-slate-900 dark:text-white"
                                >
                                    <option value="Fresher">Entry Level (0-1 Years)</option>
                                    <option value="Intermediate">Mid Senior (2-5 Years)</option>
                                    <option value="Advanced">Tech Lead (5+ Years)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Questions</label>
                            <input
                                type="range"
                                min="3"
                                max="20"
                                value={formData.questionCount}
                                onChange={(e) => setFormData({ ...formData, questionCount: e.target.value })}
                                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-center font-bold text-indigo-600 text-xl">
                                {formData.questionCount}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Generate Interview <ArrowRight size={20} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
