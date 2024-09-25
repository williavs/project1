import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface GradientProps {
  className?: string;
}

const StyledGradient = styled.div`
  background: ${theme.gradients.primary};
  width: 100%;
  height: 100%;
`;

export const Gradient: React.FC<GradientProps> = ({ className }) => {
  return <StyledGradient className={className} />;
};