const mongoose = require('mongoose');

const InterviewSessionSchema = new mongoose.Schema({
    userId: { type: String },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    questionCount: { type: Number, required: true, default: 5 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        userAnswer: { type: String },
        score: { type: Number },
        feedback: {
            strengths: [String],
            improvements: [String],
            missingKeywords: [String]
        },
        durationSeconds: Number
    }],
    totalScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('InterviewSession', InterviewSessionSchema);
