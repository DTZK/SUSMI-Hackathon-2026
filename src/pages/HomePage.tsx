// pages/HomePage.tsx
import { useState } from 'react';
import type { NavigationPage, Language, QuickAction } from '../types';
import { 
  mockUser, 
  mockCareJourney, 
  mockUpcomingAppointment, 
  mockQuickActions 
} from '../mockData';

// Import atomic components
import Header from '../components/Header';
import GreetingSection from '../components/GreetingSection';
import JourneyTracker from '../components/JourneyTracker';
import NextAppointment from '../components/NextAppointment';
import QuickActions from '../components/QuickActions';

import './HomePage.css';

// ADD THIS: Props type
type HomePageProps = {
  onNavigate?: (page: NavigationPage) => void;
};

// UPDATE THIS: Add onNavigate prop
function HomePage({ onNavigate }: HomePageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(mockUser.preferredLanguage);

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

  // Navigate to profile
  const handleProfileClick = () => {
    console.log('Profile clicked');
    if (onNavigate) {
      onNavigate('profile');
    }
  };

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