const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get questions by role and difficulty (randomized)
router.get('/', async (req, res) => {
    const { role, difficulty, count } = req.query;
    const query = {};
    if (role) query.role = role;
    if (difficulty) query.difficulty = difficulty;

    try {
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: parseInt(count) || 5 } }
        ]);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
