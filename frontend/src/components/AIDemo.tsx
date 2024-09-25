import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { createWebSocket } from '../api/client';
import { theme } from '../styles/theme';

const AIContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.medium};
`;

const ChatCard = styled(Card)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: ${theme.spacing.large};
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ChatTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xlarge};
  margin-bottom: ${theme.spacing.medium};
  text-align: center;
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  border: 1px solid ${theme.colors.accent};
  border-radius: 12px;
  padding: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<{ isUser: boolean }>`
  background-color: ${props => props.isUser ? theme.colors.primary : theme.colors.accent};
  color: ${props => props.isUser ? theme.colors.textLight : theme.colors.textDark};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: 12px;
  margin: 8px 0;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatInputContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: ${theme.spacing.small};
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: ${theme.spacing.small};
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary};
  }
`;

const SendButton = styled(Button)`
  background: ${theme.gradients.primary};
  color: ${theme.colors.textLight};
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: ${theme.spacing.small};
  transition: opacity 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: ${theme.spacing.small};
  font-weight: bold;
  background-color: rgba(255, 0, 0, 0.1);
  padding: ${theme.spacing.small};
  border-radius: 4px;
`;

interface ChatMessage {
  message: string;
  isUser: boolean;
}

export const AIDemo: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    const ws = createWebSocket('/chat');
    console.log('Attempting to connect to WebSocket');

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      setIsConnected(true);
      setError(null);
      // Send a test message to verify two-way communication
      setTimeout(() => {
        ws.send(JSON.stringify({ type: 'test', message: 'Hello, server!' }));
      }, 100);
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      try {
        const data = JSON.parse(event.data);
        setChatHistory(prev => [...prev, { message: data.response || data.message, isUser: false }]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing message:', error);
        setError('Error processing message from server');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket error occurred. Please try again later.');
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log('WebSocket closed. Code:', event.code, 'Reason:', event.reason);
      setIsConnected(false);
      setError('Connection closed. Attempting to reconnect...');
      setTimeout(connect, 3000); // Attempt to reconnect after 3 seconds
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim() || !socket || !isConnected) return;

    console.log('Sending message:', message);
    setIsLoading(true);
    setError(null);
    setChatHistory(prev => [...prev, { message, isUser: true }]);
    socket.send(JSON.stringify({ type: 'chat', message }));
    setMessage('');
  }, [message, socket, isConnected]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <AIContainer>
      <ChatCard>
        <ChatTitle>Chat with AI Willy</ChatTitle>
        <ChatHistory>
          {chatHistory.map((chat, index) => (
            <Message key={index} isUser={chat.isUser}>
              {chat.isUser ? 'You: ' : 'AI Willy: '}{chat.message}
            </Message>
          ))}
          {isLoading && <Message isUser={false}>AI Willy is thinking...</Message>}
        </ChatHistory>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ChatInputContainer>
          <ChatInput
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={!isConnected}
          />
          <SendButton onClick={handleSendMessage} disabled={!isConnected || isLoading}>
            Send
          </SendButton>
        </ChatInputContainer>
      </ChatCard>
    </AIContainer>
  );
};