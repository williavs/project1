import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const StyledFooter = styled.footer`
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.medium};
  text-align: center;
`;

export const Footer: React.FC = () => {
  return <StyledFooter>© 2023 AI App. All rights reserved.</StyledFooter>;
};