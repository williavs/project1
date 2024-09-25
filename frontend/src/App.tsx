import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Bio } from './components/Bio';
import { AIDemo } from './components/AIDemo';
import { GlobalStyle } from './styles/GlobalStyle';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Bio />} />
        <Route path="/ai-demo" element={<AIDemo />} />
      </Routes>
    </Router>
  );
};

export default App;