import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@aws-amplify/ui-react/styles.css';
import './index.css';

// Standalone version for testing without backend
console.log('🔧 Running in standalone mode - backend not required');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 