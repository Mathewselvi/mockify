import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewResult, getQuestions, submitAnswer } from '../api';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InterviewPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const init = async () => {
            try {
                const { data: sessionData } = await getInterviewResult(sessionId);
                const { data: qData } = await getQuestions({
                    role: sessionData.role,
                    difficulty: sessionData.experience,
                    count: sessionData.questionCount || 5
                });
                setQuestions(qData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [sessionId]);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleOptionSelect = async (option) => {
        if (feedback || submitting) return;
        setSelectedOption(option);
        setSubmitting(true);

        try {
            const currentQ = questions[currentQIndex];
            const { data } = await submitAnswer(sessionId, {
                questionId: currentQ._id,
                userAnswer: option,
                durationSeconds: timer
            });
            setTimeout(() => setFeedback(data.evaluation), 600);
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setSelectedOption(null);
        setSubmitting(false);
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            navigate(`/result/${sessionId}`);
        }
    };

    if (loading) return <div className="flex justify-center pt-32"><Loader2 className="animate-spin text-indigo-600 w-12 h-12" /></div>;
    if (questions.length === 0) return <div className="text-center pt-32 opacity-50 text-slate-900 dark:text-gray-400">Generating questions...</div>;

    const currentQuestion = questions[currentQIndex];
    const progress = ((currentQIndex) / questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8 relative">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    <span>Progress</span>
                    <span>{currentQIndex + 1}/{questions.length}</span>
                </div>
                <div className="h-3 w-full bg-gray-200 dark:bg-black/20 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    ></motion.div>
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
                >
                    {/* Timer */}
                    <div className="absolute top-6 right-8 text-sm font-mono font-medium text-gray-400">
                        {new Date(timer * 1000).toISOString().substr(14, 5)}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-8 mt-2">
                        {currentQuestion?.text}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion?.options.map((option, idx) => {
                            let cardState = "border-transparent bg-white/50 dark:bg-white/5 hover:bg-white hover:shadow-lg dark:hover:bg-white/10 text-slate-700 dark:text-gray-300";
                            let icon = null;

                            if (feedback) {
                                if (option === currentQuestion.correctAnswer) {
                                    cardState = "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-md shadow-green-200 dark:shadow-none";
                                    icon = <CheckCircle2 size={20} />;
                                } else if (option === selectedOption && !feedback.isCorrect) {
                                    cardState = "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                                } else {
                                    cardState = "opacity-40 grayscale";
                                }
                            } else if (selectedOption === option) {
                                cardState = "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 ring-1 ring-indigo-500 text-indigo-900 dark:text-indigo-100";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={!!feedback || submitting}
                                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${cardState}`}
                                >
                                    <span className="font-semibold text-lg">{option}</span>
                                    {icon}
                                    {!feedback && selectedOption === option && <Loader2 className="animate-spin w-5 h-5 text-indigo-600" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback Action */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 flex justify-end"
                            >
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    {currentQIndex < questions.length - 1 ? 'Continue' : 'Finish'} <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default InterviewPage;
