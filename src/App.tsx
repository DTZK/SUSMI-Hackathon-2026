// App.tsx - Main app component with page navigation
import { useState } from 'react';
import type { NavigationPage } from './types';

// Import pages
import HomePage from './pages/HomePage';
import VisitTrackerPage from './pages/VisitTrackerPage';
import InfoHubPage from './pages/InfoHubPage';
import BottomNav from './components/BottomNav';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
        
      case 'journey':
        return <VisitTrackerPage onNavigate={handleNavigate} />;
        
      case 'info':
        return <InfoHubPage onNavigate={handleNavigate} />;
        
      case 'support':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>💬 Support</h1>
              <p style={{ marginBottom: '1rem' }}>Chatbot coming soon!</p>
              <button 
                onClick={() => handleNavigate('home')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2D8CFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
        
      case 'records':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>📄 Records</h1>
              <p style={{ marginBottom: '1rem' }}>Document storage coming soon!</p>
              <button 
                onClick={() => handleNavigate('home')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2D8CFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>👤 Profile</h1>
              <p style={{ marginBottom: '1rem' }}>User settings coming soon!</p>
              <button 
                onClick={() => handleNavigate('home')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2D8CFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
        
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-wrapper">
      {renderPage()}
      <BottomNav 
        currentPage={currentPage}
        onPageChange={handleNavigate}
      />
    </div>
  );
}

export default App;