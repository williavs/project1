import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function createWebSocket(path: string): WebSocket {
  const url = `${WS_BASE_URL}${path}`;
  console.log('Creating WebSocket connection to:', url);
  
  const ws = new WebSocket(url);
  
  ws.onerror = (error) => {
    console.error('WebSocket error in client:', error);
  };
  
  return ws;
}