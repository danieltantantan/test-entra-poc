import React, { useEffect, useState } from 'react';
import './App.css';

interface User {
  username: string;
  userId: string;
  email: string;
  name: string;
  groups: string[];
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate Entra ID authentication
  const handleSignIn = () => {
    setLoading(true);
    
    // Simulate redirect to Entra ID
    const entraUrl = `https://login.microsoftonline.com/67bff79e-7f91-4433-a8e5-c9252d2ddc1d/oauth2/v2.0/authorize?` +
      `client_id=5f242a76-d9fd-41fe-9aa6-e66e57664782&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&` +
      `scope=openid profile email User.Read GroupMember.Read.All&` +
      `state=test-state&` +
      `nonce=test-nonce`;
    
    // In a real app, this would redirect to Entra ID
    console.log('🔗 Would redirect to:', entraUrl);
    
    // Simulate successful authentication after 2 seconds
    setTimeout(() => {
      const mockUser: User = {
        username: 'john.doe@autodesk.com',
        userId: 'user-123-456-789',
        email: 'john.doe@autodesk.com',
        name: 'John Doe',
        groups: ['CSP-Admins', 'Support-Team', 'DevRel-Team']
      };
      
      setUser(mockUser);
      setLoading(false);
      console.log('✅ Mock user authenticated:', mockUser);
    }, 2000);
  };

  const handleSignOut = () => {
    setUser(null);
    console.log('🚪 User signed out');
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Authenticating with Entra ID...</p>
          <small>This is a simulation - normally you'd be redirected to Entra ID</small>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 Customer Support Portal</h1>
        <p>Autodesk Entra ID Integration (Standalone Demo)</p>
      </header>

      <div className="demo-notice" style={{
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem 0',
        textAlign: 'center'
      }}>
        <strong>📋 Demo Mode:</strong> This is a frontend-only demo simulating Entra ID integration.
        <br />
        <small>For full integration, deploy the AWS backend using the guide above.</small>
      </div>

      {!user ? (
        <div className="auth-container">
          <div className="welcome-card">
            <h2>🚪 Welcome</h2>
            <p>Please sign in with your Autodesk Entra ID account to access the Customer Support Portal.</p>
            <button onClick={handleSignIn} className="sign-in-button">
              🔑 Sign In with Autodesk Entra ID (Demo)
            </button>
            
            <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
              <strong>Demo Flow:</strong>
              <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                <li>Click sign in button</li>
                <li>Normally redirects to Entra ID login</li>
                <li>User enters Autodesk credentials</li>
                <li>Entra ID validates and returns user info</li>
                <li>User is signed into the portal</li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <div className="user-info-card">
            <h2>✅ Welcome, {user.name}!</h2>
            <div className="user-details">
              <div className="detail-item">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="detail-item">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="detail-item">
                <strong>User ID:</strong> {user.userId}
              </div>
              <div className="detail-item">
                <strong>Groups:</strong> {user.groups.join(', ')}
              </div>
              <div className="detail-item">
                <strong>Authentication Method:</strong> Entra ID SAML (Simulated)
              </div>
            </div>
          </div>

          <div className="actions-card">
            <h3>Customer Support Actions</h3>
            <div className="action-buttons">
              <button className="action-btn primary" onClick={() => alert('Feature would query support cases from backend')}>
                📋 View Support Cases
              </button>
              <button className="action-btn primary" onClick={() => alert('Feature would show user management interface')}>
                👥 Manage Users
              </button>
              <button className="action-btn primary" onClick={() => alert('Feature would open account search')}>
                🔍 Search Accounts
              </button>
              <button className="action-btn secondary" onClick={() => alert('Feature would show admin settings')}>
                ⚙️ Admin Settings
              </button>
            </div>
          </div>

          <details className="debug-info">
            <summary>🔍 Debug Information (Demo Data)</summary>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </details>

          <div className="sign-out-container">
            <button onClick={handleSignOut} className="sign-out-button">
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>Customer Support Portal - Entra ID Integration Demo</p>
        <small>For production: Deploy backend via AWS Amplify Console</small>
      </footer>
    </div>
  );
}

export default App; 