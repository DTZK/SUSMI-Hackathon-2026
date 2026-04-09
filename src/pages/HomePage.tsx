// pages/HomePage.tsx
import { useState } from 'react';
import type { Language, QuickAction } from '../types';
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

function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(mockUser.preferredLanguage);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    console.log('Language changed to:', language);
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log('Quick action clicked:', action.action);
    alert(`Chatbot: "${action.action}"`);
  };

  const handleJourneyClick = () => {
    console.log('Journey clicked - navigate to journey page');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
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