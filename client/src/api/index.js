import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

export const startInterview = (data) => api.post('/interviews/start', data);
export const getQuestions = (params) => api.get('/questions', { params });
export const submitAnswer = (sessionId, data) => api.post(`/interviews/${sessionId}/answer`, data);
export const getInterviewResult = (sessionId) => api.get(`/interviews/${sessionId}`);

export default api;
