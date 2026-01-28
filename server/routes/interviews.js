const express = require('express');
const router = express.Router();
const InterviewSession = require('../models/InterviewSession');
const Question = require('../models/Question');
const { evaluateAnswer } = require('../utils/evaluationEngine');

// Start new session
router.post('/start', async (req, res) => {
    const { userId, role, experience, questionCount } = req.body;
    try {
        const session = new InterviewSession({ userId, role, experience, questionCount });
        await session.save();
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Submit answer
router.post('/:sessionId/answer', async (req, res) => {
    const { sessionId } = req.params;
    const { questionId, userAnswer, durationSeconds } = req.body;

    try {
        const session = await InterviewSession.findById(sessionId);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const evaluation = evaluateAnswer(question, userAnswer);

        const answerEntry = {
            questionId,
            userAnswer,
            score: evaluation.score,
            feedback: evaluation.feedback,
            durationSeconds
        };

        session.answers.push(answerEntry);
        session.totalScore += evaluation.score;
        await session.save();

        res.json({
            evaluation
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get session results
router.get('/:sessionId', async (req, res) => {
    try {
        const session = await InterviewSession.findById(req.params.sessionId).populate('answers.questionId');
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
