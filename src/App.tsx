import React, { useEffect, useState } from 'react';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import './App.css';

interface User {
  username: string;
  userId: string;
  signInDetails?: any;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    
    // Listen for auth events
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          checkUser();
          break;
        case 'signInWithRedirect_failure':
          setError('Sign in failed');
          setLoading(false);
          break;
        case 'customOAuthState':
          checkUser();
          break;
      }
    });

    return unsubscribe;
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      console.log('✅ Current user:', currentUser);
    } catch (err: any) {
      console.log('ℹ️ No user signed in:', err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithRedirect({
        provider: { custom: 'AutodeskEntraIDSAML' }
      });
    } catch (err: any) {
      setError(`Sign in failed: ${err.message}`);
      console.error('❌ Sign in error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setError(null);
    } catch (err: any) {
      setError(`Sign out failed: ${err.message}`);
      console.error('❌ Sign out error:', err);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 Customer Support Portal</h1>
        <p>Autodesk Entra ID + AWS Amplify SAML Integration</p>
      </header>

      {error && (
        <div className="error-message">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {!user ? (
        <div className="auth-container">
          <div className="welcome-card">
            <h2>🚪 Welcome</h2>
            <p>Please sign in with your Autodesk Entra ID account to access the Customer Support Portal.</p>
            <button onClick={handleSignIn} className="sign-in-button">
              🔑 Sign In with Autodesk Entra ID
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <div className="user-info-card">
            <h2>✅ Welcome, {user.username}!</h2>
            <div className="user-details">
              <div className="detail-item">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="detail-item">
                <strong>User ID:</strong> {user.userId}
              </div>
              <div className="detail-item">
                <strong>Authentication Method:</strong> Entra ID SAML
              </div>
            </div>
          </div>

          <div className="actions-card">
            <h3>Customer Support Actions</h3>
            <div className="action-buttons">
              <button className="action-btn primary">📋 View Support Cases</button>
              <button className="action-btn primary">👥 Manage Users</button>
              <button className="action-btn primary">🔍 Search Accounts</button>
              <button className="action-btn secondary">⚙️ Admin Settings</button>
            </div>
          </div>

          <details className="debug-info">
            <summary>🔍 Debug Information</summary>
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
        <p>Customer Support Portal - Powered by AWS Amplify & Autodesk Entra ID</p>
      </footer>
    </div>
  );
}

export default App; 