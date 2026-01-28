import axios from 'axios';

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (!envUrl) return 'http://localhost:5001/api';
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

export const startInterview = (data) => api.post('/interviews/start', data);
export const getQuestions = (params) => api.get('/questions', { params });
export const submitAnswer = (sessionId, data) => api.post(`/interviews/${sessionId}/answer`, data);
export const getInterviewResult = (sessionId) => api.get(`/interviews/${sessionId}`);

export default api;
