import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// See https://reactjs.org/docs/strict-mode.html
const StrictApp = () => {
  return <App />;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<StrictApp />);
