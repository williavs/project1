import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/token', { username, password });
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await apiClient.post('/users', { username, email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;