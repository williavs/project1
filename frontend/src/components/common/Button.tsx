import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? theme.gradients.primary : theme.colors.white};
  color: ${props => props.variant === 'primary' ? theme.colors.white : theme.colors.primary};
  border: none;
  border-radius: 4px;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  font-size: ${theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', variant = 'primary', className }) => {
  return (
    <StyledButton onClick={onClick} type={type} variant={variant} className={className}>
      {children}
    </StyledButton>
  );
};