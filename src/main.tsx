import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App';
import '@aws-amplify/ui-react/styles.css';
import './index.css';

// Handle missing amplify_outputs.json gracefully
let isConfigured = false;
try {
  // Try to import amplify_outputs.json
  const outputs = require('../amplify_outputs.json');
  Amplify.configure(outputs);
  isConfigured = true;
  console.log('✅ Amplify configured successfully');
} catch (error) {
  console.warn('⚠️ amplify_outputs.json not found. Backend deployment in progress...');
}

// Component to show when backend is not configured
const BackendNotConfigured = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px'
  }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '600px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
        🚀 Backend Deployment in Progress
      </h1>
      <p style={{ color: '#7f8c8d', marginBottom: '2rem', lineHeight: 1.6 }}>
        Your Customer Support Portal is being deployed. The backend authentication services are being set up.
      </p>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ margin: 0, color: '#555' }}>
          ⏳ Please wait for the deployment to complete, then refresh this page.
        </p>
      </div>

      <div style={{ 
        background: '#d1ecf1', 
        padding: '1rem', 
        borderRadius: '4px',
        borderLeft: '4px solid #bee5eb'
      }}>
        <strong>✅ Entra ID Configuration Ready:</strong>
        <br />
        <small style={{ color: '#6c757d' }}>
          Tenant ID: 67bff79e-7f91-4433-a8e5-c9252d2ddc1d
        </small>
      </div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isConfigured ? <App /> : <BackendNotConfigured />}
  </React.StrictMode>,
); 