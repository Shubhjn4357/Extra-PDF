import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/home/LandingPage';
import { EditorPage } from './features/editor/EditorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor/:toolId" element={<EditorPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default App;