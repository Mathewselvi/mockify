import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInterviewResult } from '../api';
import { Loader2, Award, Zap, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultPage = () => {
    const { sessionId } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const { data } = await getInterviewResult(sessionId);
                setResult(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [sessionId]);

    if (loading) return <div className="flex justify-center pt-32"><Loader2 className="animate-spin text-indigo-600 w-10 h-10" /></div>;
    if (!result) return <div className="text-center pt-32 text-slate-900 dark:text-white">Unable to load results.</div>;

    const totalQuestions = result.answers.length;
    const correctAnswers = result.answers.filter(a => a.score > 0).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-tr from-violet-500 to-indigo-500 shadow-2xl shadow-indigo-500/40 mb-6 text-white"
                >
                    <Award size={48} fill="currentColor" className="opacity-80" />
                </motion.div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    {percentage >= 80 ? 'Outstanding!' : percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}
                </h1>
                <p className="text-gray-500 font-medium">Interview Session Completed</p>
            </div>

            {/* Score Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Main Score */}
                <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
                    {/* Background Gradient Mesh */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors"></div>

                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Total Efficiency</h2>
                    <div className="flex items-end gap-4">
                        <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 leading-[0.9]">
                            {percentage}%
                        </span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    <div className="glass-panel rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Correct</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{correctAnswers} <span className="text-base text-gray-300 font-normal">/ {totalQuestions}</span></p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                            <Zap size={20} fill="currentColor" />
                        </div>
                    </div>
                    <button onClick={() => window.location.href = '/'} className="w-full h-full glass-panel rounded-3xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer text-indigo-600 dark:text-indigo-400 font-bold">
                        <RefreshCw size={32} />
                        Try Again
                    </button>
                </div>
            </div>

            {/* Detailed Review */}
            <div className="glass-panel rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-gray-100 dark:border-white/5">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Performance Breakdown</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                    {result.answers.map((answer, index) => {
                        const isCorrect = answer.score > 0;
                        return (
                            <div key={index} className="p-6 md:p-8 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                <div className="flex gap-6">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${isCorrect ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-500 dark:bg-red-900/30'}`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                                            {answer.questionId?.text}
                                        </h4>
                                        <p className="text-sm text-gray-500 mb-1">You selected: <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>{answer.userAnswer}</span></p>
                                        {!isCorrect && (
                                            <p className="text-sm text-gray-500">Correct answer: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{answer.questionId?.correctAnswer}</span></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
