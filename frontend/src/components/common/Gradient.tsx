import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface GradientProps {
  children: React.ReactNode;
  className?: string;
}

const StyledGradient = styled.div`
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.large};
  border-radius: 8px;
`;

export const Gradient: React.FC<GradientProps> = ({ children, className }) => {
  return <StyledGradient className={className}>{children}</StyledGradient>;
};