/**
 * Main React App Component
 * Manages application state and routing
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '@pages/MainPage';
import SettingsPage from '@pages/SettingsPage';
import AvatarCustomizationPage from '@pages/AvatarCustomizationPage';
import './App.css';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize services
        setIsInitialized(true);
      } catch (err) {
        setError((err as Error).message);
        console.error('App initialization error:', err);
      }
    };

    initializeApp();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h1>Application Error</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reload Application
        </button>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Initializing OpenAvatar Cam...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/customize" element={<AvatarCustomizationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
