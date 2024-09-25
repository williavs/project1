import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { createWebSocket } from '../api/client';
import { theme } from '../styles/theme';

const AIContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.large};
`;

const ChatCard = styled(Card)`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing.large};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChatTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xlarge};
  margin-bottom: ${theme.spacing.medium};
  text-align: center;
`;

const ChatHistory = styled.div`
  margin-top: ${theme.spacing.medium};
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.accent};
  border-radius: 8px;
  padding: ${theme.spacing.small};
`;

const Message = styled.div<{ isUser: boolean }>`
  background-color: ${props => props.isUser ? theme.colors.primary : theme.colors.accent};
  color: ${theme.colors.text};
  padding: ${theme.spacing.small};
  border-radius: 8px;
  margin: 8px 0;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: ${theme.spacing.medium};
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: ${theme.spacing.small};
  border: 1px solid ${theme.colors.accent};
  border-radius: 4px;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
`;

const SendButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  margin-left: ${theme.spacing.small};
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: ${theme.spacing.small};
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