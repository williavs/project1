import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const SkillsContainer = styled.div`
  margin-top: ${theme.spacing.large};
`;

const SkillsTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.medium};
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.small};
`;

const SkillItem = styled.li`
  background-color: ${theme.colors.accent};
  color: ${theme.colors.background};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: 20px;
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
`;

export const Skills: React.FC = () => {
  const skills = ['React', 'TypeScript', 'Python', 'FastAPI', 'Machine Learning', 'AI', 'Product Management'];

  return (
    <SkillsContainer>
      <SkillsTitle>My Skills</SkillsTitle>
      <SkillsList>
        {skills.map((skill, index) => (
          <SkillItem key={index}>{skill}</SkillItem>
        ))}
      </SkillsList>
    </SkillsContainer>
  );
};