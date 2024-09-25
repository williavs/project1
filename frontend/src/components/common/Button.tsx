import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary'; disabled: boolean }>`
  background: ${props => props.variant === 'primary' ? theme.gradients.primary : theme.colors.background};
  color: ${props => props.variant === 'primary' ? theme.colors.background : theme.colors.primary};
  border: none;
  border-radius: 4px;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  font-size: ${theme.fontSizes.medium};
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className,
  disabled = false
}) => {
  return (
    <StyledButton 
      onClick={onClick} 
      type={type} 
      variant={variant} 
      className={className}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};