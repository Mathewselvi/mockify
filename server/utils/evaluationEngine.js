const evaluateAnswer = (question, userAnswer) => {
    // userAnswer is expected to be the string of the selected option
    const isCorrect = userAnswer === question.correctAnswer;

    return {
        score: isCorrect ? 100 : 0,
        isCorrect, // Helper for frontend
        feedback: {
            strengths: isCorrect ? ["Correct Answer!"] : [],
            improvements: isCorrect ? [] : [`Incorrect. The correct answer was: ${question.correctAnswer}`],
            missingKeywords: [] // Legacy support
        },
        breakdown: {
            result: isCorrect ? "Pass" : "Fail"
        }
    };
};

module.exports = { evaluateAnswer };
