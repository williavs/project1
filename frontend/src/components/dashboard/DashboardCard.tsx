import React from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';
import { theme } from '../../styles/theme';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StyledDashboardCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h3`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  margin-bottom: ${theme.spacing.small};
`;

const Value = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  margin-bottom: ${theme.spacing.medium};
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${theme.colors.secondary};
`;

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <StyledDashboardCard>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledDashboardCard>
  );
};