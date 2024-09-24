import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Gradient } from './components/common/Gradient';
import { theme } from './styles/theme';
import Calculator from './components/Calculator';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${theme.spacing.large};
`;

const GradientSection = styled(Gradient)`
  margin-bottom: ${theme.spacing.large};
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <MainContent>
          <GradientSection>
            <h1>Welcome to Our Simple Calculator App</h1>
            <p>A basic application with a Python backend</p>
          </GradientSection>
          <Calculator />
        </MainContent>
        <Footer />
      </AppWrapper>
    </Router>
  );
};

export default App;