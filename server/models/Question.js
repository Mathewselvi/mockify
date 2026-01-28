const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    role: { type: String, enum: ['Frontend', 'Backend', 'Full Stack', 'HR', 'Fresher'], required: true },
    difficulty: { type: String, enum: ['Fresher', 'Intermediate', 'Advanced'], default: 'Fresher' },
    options: [{ type: String, required: true }], // Array of 4 options
    correctAnswer: { type: String, required: true } // The exact text of the correct option
});

module.exports = mongoose.model('Question', QuestionSchema);
