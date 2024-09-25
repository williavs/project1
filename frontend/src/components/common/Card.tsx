import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.large};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>;
};