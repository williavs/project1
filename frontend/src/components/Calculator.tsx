import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from './common/Card';
import { Button } from './common/Button';
import apiClient from '../api/client';

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Result = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Calculator: React.FC = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    try {
      const response = await apiClient.post('/calculate', {
        operation,
        x: parseFloat(x),
        y: parseFloat(y),
      });
      if (response.data.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult(response.data.result);
        setError(null);
      }
    } catch (err) {
      setError('An error occurred');
      setResult(null);
    }
  };

  return (
    <Card>
      <h2>Simple Calculator</h2>
      <Input
        type="number"
        value={x}
        onChange={(e) => setX(e.target.value)}
        placeholder="Enter first number"
      />
      <Input
        type="number"
        value={y}
        onChange={(e) => setY(e.target.value)}
        placeholder="Enter second number"
      />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <Button onClick={handleCalculate}>Calculate</Button>
      {result !== null && <Result>Result: {result}</Result>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Card>
  );
};

export default Calculator;