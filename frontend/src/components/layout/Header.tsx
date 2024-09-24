import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';

const StyledHeader = styled.header`
  background: ${theme.gradients.primary};
  padding: ${theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  text-decoration: none;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo to="/">Simple App</Logo>
    </StyledHeader>
  );
};