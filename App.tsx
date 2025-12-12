import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/home/LandingPage';
import { EditorPage } from './features/editor/EditorPage';
import { FileProvider } from './contexts/FileContext';
import { SettingsProvider } from './contexts/SettingsContext';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <FileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor/:toolId" element={<EditorPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Router>
      </FileProvider>
    </SettingsProvider>
  );
};

export default App;