// pages/HomePage.tsx
import { useState } from 'react';
import type { NavigationPage, Language, QuickAction } from '../types';
import { 
  mockUser, 
  mockCareJourney, 
  mockUpcomingAppointment, 
  mockQuickActions,
  mockSmartAlerts
} from '../mockData';

// Import atomic components
import Header from '../components/Header';
import GreetingSection from '../components/GreetingSection';
import JourneyTracker from '../components/JourneyTracker';
import NextAppointment from '../components/NextAppointment';
import QuickActions from '../components/QuickActions';
import SmartAlerts from '../components/SmartAlerts'; 

import './HomePage.css';


type HomePageProps = {
  onNavigate?: (page: NavigationPage) => void;
};


function HomePage({ onNavigate }: HomePageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(mockUser.preferredLanguage);
  const [alerts, setAlerts] = useState(mockSmartAlerts);
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    console.log('Language changed to:', language);
  };

  // Handle navigation
  const handleQuickAction = (action: QuickAction) => {
    console.log('Quick action clicked:', action.action);
    
    // Navigate to Info Hub if "Info hub" action
    if (action.title === 'Info hub' && onNavigate) {
      onNavigate('info');
      return;
    }
    
    alert(`Chatbot: "${action.action}"`);
  };

  // Navigate to journey
  const handleJourneyClick = () => {
    console.log('Journey clicked - navigate to journey page');
    if (onNavigate) {
      onNavigate('journey');
    }
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };
  const handleDismissAlert = (alertId: string) =>{
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, dismissed: true } : alert
      )
    );
  };

  const handleAlertAction = (actionHandler: string) => {
    console.log(`Alert action: ${actionHandler}`);
    
    // Navigate based on action
    if (actionHandler === 'view-spending' && onNavigate) {
      onNavigate('journey');
    } else if (actionHandler === 'learn-health-check' && onNavigate) {
      onNavigate('info');
    } else {
      alert(`Action: ${actionHandler}`);
    }
  };

  // Navigate to profile
  const handleProfileClick = () => {
    console.log('Profile clicked');
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  // Filter to show only top 3 most important alerts on homepage
  const topAlerts = alerts
    .filter(a => !a.dismissed)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  return (
    <div className="page-container">
      <Header 
        onNotificationClick={handleNotificationClick}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
        hasNotifications={true}
      />

      <main className="main-content">
        <GreetingSection
          userName={mockUser.name}
          referringGP={mockUser.referringGP}
          medicareActive={mockUser.medicareActive}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        {topAlerts.length > 0 && (
                  <>
                    <SmartAlerts 
                      alerts={topAlerts}
                      onDismiss={handleDismissAlert}
                      onAction={handleAlertAction}
                    />
                    {alerts.filter(a => !a.dismissed).length > 3 && (
                      <button 
                        className="view-all-alerts-btn"
                        onClick={() => onNavigate && onNavigate('alerts' as NavigationPage)}
                      >
                        View All Alerts ({alerts.filter(a => !a.dismissed).length})
                      </button>
                    )}
                  </>
                )}
        <JourneyTracker 
          journey={mockCareJourney}
          onJourneyClick={handleJourneyClick}
        />

        <NextAppointment 
          appointment={mockUpcomingAppointment}
        />

        <QuickActions 
          actions={mockQuickActions}
          onActionClick={handleQuickAction}
        />
      </main>
    </div>
  );
}

export default HomePage;