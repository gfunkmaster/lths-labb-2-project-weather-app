import React, { useState } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  padding: 10px;
  border: 2px solid #ff0000;
  border-radius: 8px;
`;

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleError = (error: Error | null, errorInfo: React.ErrorInfo) => {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      setHasError(true);
      setErrorMessage(error?.message || 'An error occurred.');
    };
  
    return hasError ? (
      <ErrorMessage>{errorMessage}</ErrorMessage>
    ) : (
      <>{children}</>
    );
  };

export default ErrorBoundary;
