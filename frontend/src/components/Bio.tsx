import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from './common/Card';
import { theme } from '../styles/theme';
import { Skills } from './Skills';
import profilePicture from '../profile-picture.jpg'; // Make sure this image exists

const BioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.large};
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.large};
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileSection = styled.div`
  flex: 1;
`;

const InfoSection = styled.div`
  flex: 2;
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: ${theme.spacing.large};
  margin-bottom: ${theme.spacing.large};
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: ${theme.spacing.medium};
  border: 4px solid ${theme.colors.accent};
`;

const BioTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xlarge};
  margin-bottom: ${theme.spacing.small};
`;

const BioSubtitle = styled.h2`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.medium};
`;

const BioContent = styled.p`
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.medium};
`;

const BioSectionTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.small};
`;

const ChatButton = styled(Link)`
  display: inline-block;
  background: ${theme.gradients.primary};
  color: ${theme.colors.text};
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Bio: React.FC = () => {
  return (
    <BioContainer>
      <ContentWrapper>
        <ProfileSection>
          <GlassCard>
            <ProfileImage src={profilePicture} alt="Willy VanSickle" />
            <BioTitle>Willy John (WJVSIII) VanSickle III</BioTitle>
            <BioSubtitle>
              Paradigm Shifter | AI Enthusiast | Product Innovator | 🧖🏻 Wellness Advocate
            </BioSubtitle>
            <ChatButton to="/ai-demo">Chat with AI Willy</ChatButton>
          </GlassCard>
          <GlassCard>
            <Skills />
          </GlassCard>
        </ProfileSection>
        <InfoSection>
          <GlassCard>
            <BioSectionTitle>My Journey</BioSectionTitle>
            <BioContent>
              From bartending to leading AI initiatives, my career has been a thrilling ride of constant learning and innovation. I've always been driven by a passion for technology and its potential to transform businesses and lives.
            </BioContent>
          </GlassCard>
          <GlassCard>
            <BioSectionTitle>Current Mission</BioSectionTitle>
            <BioContent>
              At Justworks, I'm on a mission to revolutionize customer-facing roles in process-heavy sales environments. By leveraging cutting-edge AI technologies, I'm working to create tools that not only boost efficiency but also promote equity in technology distribution and education.
            </BioContent>
          </GlassCard>
          <GlassCard>
            <BioSectionTitle>Professional Highlights</BioSectionTitle>
            <BioContent>
              • Associate Product Manager GTM AI at Justworks (Jul 2024 - Present)<br />
              • AI Hive: GenAI and Sales Understanding (Apr 2024 - Present)<br />
              • Associate Account Executive at Justworks (Jun 2023 - Jul 2024)<br />
              Consistently exceeded goals, achieving up to 192% of targets. Pioneered new outbound strategies and played a key role in launching Justworks Payroll.
            </BioContent>
          </GlassCard>
          <GlassCard>
            <BioSectionTitle>Beyond the Office</BioSectionTitle>
            <BioContent>
              When I'm not immersed in the world of AI and sales, you might find me exploring the latest wellness trends, advocating for mental health, or diving into a good sci-fi novel. I believe in the power of continuous learning and personal growth, both in and out of the professional sphere.
            </BioContent>
          </GlassCard>
        </InfoSection>
      </ContentWrapper>
    </BioContainer>
  );
};