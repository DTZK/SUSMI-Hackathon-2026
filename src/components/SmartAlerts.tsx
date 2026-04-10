// components/SmartAlerts.tsx
import { useState } from 'react';
import type { SmartAlert } from '../types';
import './SmartAlerts.css';

type SmartAlertsProps = {
  alerts: SmartAlert[];
  onDismiss: (alertId: string) => void;
  onAction: (actionHandler: string, alertId: string) => void;
  showAll?: boolean;
};

function SmartAlerts({ alerts, onDismiss, onAction, showAll = false }: SmartAlertsProps) {
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

  // Filter out dismissed alerts unless showAll is true
  const visibleAlerts = showAll 
    ? alerts 
    : alerts.filter(alert => !alert.dismissed);

  // Sort by priority (lower number = higher priority)
  const sortedAlerts = [...visibleAlerts].sort((a, b) => a.priority - b.priority);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'important': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const toggleExpand = (alertId: string) => {
    setExpandedAlertId(expandedAlertId === alertId ? null : alertId);
  };

  if (sortedAlerts.length === 0) {
    return (
      <section className="smart-alerts-section">
        <h2 className="section-title">SMART ALERTS</h2>
        <div className="no-alerts">
          <span className="no-alerts-icon">✨</span>
          <p>All caught up! No alerts at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="smart-alerts-section">
      <h2 className="section-title">
        SMART ALERTS
        {sortedAlerts.length > 0 && (
          <span className="alert-count">{sortedAlerts.length}</span>
        )}
      </h2>
      
      <div className="alerts-list">
        {sortedAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`alert-card ${alert.type} ${expandedAlertId === alert.id ? 'expanded' : ''}`}
          >
            <div className="alert-header" onClick={() => toggleExpand(alert.id)}>
              <div className="alert-icon">{getAlertIcon(alert.type)}</div>
              <div className="alert-main">
                <h4 className="alert-title">{alert.title}</h4>
                <p className="alert-message">{alert.message}</p>
                {alert.dueDate && (
                  <span className="alert-due">Due: {alert.dueDate}</span>
                )}
              </div>
              <button 
                className="alert-expand-btn"
                aria-label={expandedAlertId === alert.id ? 'Collapse' : 'Expand'}
              >
                {expandedAlertId === alert.id ? '−' : '+'}
              </button>
            </div>

            {expandedAlertId === alert.id && (
              <div className="alert-details">
                {alert.contextualInfo && (
                  <div className="alert-context">
                    <strong>Why this matters:</strong>
                    <p>{alert.contextualInfo}</p>
                  </div>
                )}
                
                <div className="alert-actions">
                  {alert.actionLabel && alert.actionHandler && (
                    <button 
                      className="alert-action-btn primary"
                      onClick={() => onAction(alert.actionHandler!, alert.id)}
                    >
                      {alert.actionLabel}
                    </button>
                  )}
                  <button 
                    className="alert-action-btn secondary"
                    onClick={() => onDismiss(alert.id)}
                  >
                    Dismiss
                  </button>
                </div>

                <div className="alert-meta">
                  <span className="alert-category">{alert.category.replace('-', ' ')}</span>
                  <span className="alert-date">Created: {alert.createdAt}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SmartAlerts;