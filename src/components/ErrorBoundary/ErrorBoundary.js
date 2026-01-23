import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <pre style={{ color: 'red', margin: '1rem 0' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to console in development
        if (import.meta.env.MODE === 'development') {
          console.error('Error caught by boundary:', error, errorInfo);
        }
        // In production, you could log to an error tracking service
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
