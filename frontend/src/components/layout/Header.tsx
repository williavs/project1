import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const StyledHeader = styled.header`
  background: ${theme.gradients.primary};
  padding: ${theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${theme.spacing.medium};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo to="/">Willy VanSickle</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/ai-demo">AI Chat</NavLink>
      </NavLinks>
    </StyledHeader>
  );
};