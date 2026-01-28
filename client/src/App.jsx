import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InterviewPage from './pages/InterviewPage';
import ResultPage from './pages/ResultPage';
import Layout from './components/Layout';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/interview/:sessionId" element={<InterviewPage />} />
                    <Route path="/result/:sessionId" element={<ResultPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
