import axios from 'axios';

const getBaseUrl = () => {
    let envUrl = import.meta.env.VITE_API_URL;
    if (!envUrl) return 'http://localhost:5001/api';

    // Remove trailing slash if present to avoid double slashes
    if (envUrl.endsWith('/')) {
        envUrl = envUrl.slice(0, -1);
    }

    // Check if it already ends with /api (handling both cases)
    if (envUrl.endsWith('/api')) {
        return envUrl;
    }

    return `${envUrl}/api`;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

export const startInterview = (data) => api.post('/interviews/start', data);
export const getQuestions = (params) => api.get('/questions', { params });
export const submitAnswer = (sessionId, data) => api.post(`/interviews/${sessionId}/answer`, data);
export const getInterviewResult = (sessionId) => api.get(`/interviews/${sessionId}`);

export default api;
