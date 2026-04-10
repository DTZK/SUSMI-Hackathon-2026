// pages/AlertsPage.tsx
import { useState } from 'react';
import type { NavigationPage, SmartAlert } from '../types';
import { mockSmartAlerts } from '../mockData';
import Header from '../components/Header';
import SmartAlerts from '../components/SmartAlerts';
import './AlertsPage.css';

type AlertsPageProps = {
  onNavigate?: (page: NavigationPage) => void;
};

function AlertsPage({ onNavigate }: AlertsPageProps) {
  const [alerts, setAlerts] = useState<SmartAlert[]>(mockSmartAlerts);
  const [showDismissed, setShowDismissed] = useState(false);

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleDismiss = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, dismissed: true } : alert
      )
    );
  };

  const handleAction = (actionHandler: string, alertId: string) => {
    console.log(`Action triggered: ${actionHandler} for alert ${alertId}`);
    
    // Handle different actions
    switch (actionHandler) {
      case 'book-gp':
        alert('Opening GP booking system...');
        break;
      case 'log-bp':
        alert('Opening BP logging form...');
        break;
      case 'check-test':
        alert('Checking test status...');
        break;
      case 'learn-health-check':
        if (onNavigate) onNavigate('info');
        break;
      case 'view-spending':
        if (onNavigate) onNavigate('journey');
        break;
      default:
        alert(`Action: ${actionHandler}`);
    }
  };

  const activeAlerts = alerts.filter(a => !a.dismissed);
  const dismissedAlerts = alerts.filter(a => a.dismissed);

  return (
    <div className="page-container">
      <Header hasNotifications={true} />

      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>
            ←
          </button>
          <h1 className="page-title">Smart Alerts</h1>
        </div>

        {/* Alert Stats */}
        <div className="alert-stats">
          <div className="stat-box urgent">
            <div className="stat-number">
              {alerts.filter(a => !a.dismissed && a.type === 'urgent').length}
            </div>
            <div className="stat-label">Urgent</div>
          </div>
          <div className="stat-box important">
            <div className="stat-number">
              {alerts.filter(a => !a.dismissed && a.type === 'important').length}
            </div>
            <div className="stat-label">Important</div>
          </div>
          <div className="stat-box info">
            <div className="stat-number">
              {alerts.filter(a => !a.dismissed && a.type === 'info').length}
            </div>
            <div className="stat-label">Info</div>
          </div>
        </div>

        {/* Active Alerts */}
        <SmartAlerts 
          alerts={activeAlerts}
          onDismiss={handleDismiss}
          onAction={handleAction}
        />

        {/* Show Dismissed Toggle */}
        {dismissedAlerts.length > 0 && (
          <div className="dismissed-section">
            <button 
              className="show-dismissed-btn"
              onClick={() => setShowDismissed(!showDismissed)}
            >
              {showDismissed ? 'Hide' : 'Show'} Dismissed Alerts ({dismissedAlerts.length})
            </button>

            {showDismissed && (
              <div className="dismissed-alerts">
                <h3>Dismissed Alerts</h3>
                <SmartAlerts 
                  alerts={dismissedAlerts}
                  onDismiss={handleDismiss}
                  onAction={handleAction}
                  showAll={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="alerts-info">
          <h3>💡 About Smart Alerts</h3>
          <p>
            NavCare analyzes your medical history and upcoming appointments to provide 
            personalized, context-driven reminders. These alerts help you:
          </p>
          <ul>
            <li>Stay on top of follow-up appointments</li>
            <li>Never miss important tests or screenings</li>
            <li>Track preventive care opportunities</li>
            <li>Optimize your Medicare benefits</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AlertsPage;