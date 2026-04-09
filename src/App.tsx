// App.tsx - Main app component with page navigation
import { useState } from 'react';
import { type NavigationPage } from './types';

// Import pages
import HomePage from './pages/HomePage';
import VisitTrackerPage from './pages/VisitTrackerPage';
import InfoHubPage from './pages/InfoHubPage';
import BottomNav from './components/BottomNav';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'journey':
        return <VisitTrackerPage />;
      case 'info':
        return <InfoHubPage />;
      case 'support':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>Support (Coming Soon)</h1>
              <p>Chatbot and support features will be available here.</p>
            </div>
          </div>
        );
      case 'records':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>Records (Coming Soon)</h1>
              <p>Document storage and medical records will be available here.</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="page-container">
            <div className="main-content" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <h1>Profile (Coming Soon)</h1>
              <p>User profile and settings will be available here.</p>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-wrapper">
      {renderPage()}
      <BottomNav 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;