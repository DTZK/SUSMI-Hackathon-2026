// pages/VisitTrackerPage.tsx
import { useState } from 'react';
import { mockVisits, mockHealthSummary } from '../mockData';
import Header from '../components/Header';
import './VisitTrackerPage.css';

type TabType = 'dashboard' | 'visit-notes' | 'timeline';

function VisitTrackerPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(null);

  const handleBackClick = () => {
    console.log('Navigate back');
  };

  const toggleVisit = (visitId: string) => {
    setExpandedVisitId(expandedVisitId === visitId ? null : visitId);
  };

  // Dashboard Tab Content
  const renderDashboard = () => (
    <div className="dashboard-tab">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{mockHealthSummary.totalVisits}</div>
          <div className="stat-label">Total visits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value cost">${mockHealthSummary.outOfPocketTotal}</div>
          <div className="stat-label">Out of pocket</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{mockHealthSummary.upcomingAppointments}</div>
          <div className="stat-label">Upcoming</div>
        </div>
      </div>

      {/* AI Health Summary */}
      <div className="ai-summary-card">
        <div className="ai-summary-header">
          <h3>✨ Sarah's health snapshot</h3>
          <span className="ai-badge">AI GENERATED</span>
        </div>
        <p className="ai-summary-text">
          Over the past 4 months, Sarah has completed 2 of 5 steps in her cardiology referral pathway. 
          Her GP visits flagged elevated blood pressure and mild chest tightness. She has been referred 
          to Dr. Lisa Park (cardiologist) and is awaiting her first specialist consultation on 18 Apr.
        </p>
        <ul className="ai-summary-points">
          <li>🔴 Blood pressure elevated at last 2 GP visits — monitor closely</li>
          <li>📄 Referral letter sent — awaiting specialist appointment confirmation</li>
          <li>💊 No active prescriptions — medication review recommended post-specialist</li>
          <li>💰 Medicare Safety Net threshold: $189 of $560 reached this year</li>
        </ul>
      </div>

      {/* Spending Breakdown */}
      <div className="spending-card">
        <h3>SPENDING BREAKDOWN</h3>
        <div className="spending-item">
          <div className="spending-label">
            <span className="spending-icon">👨‍⚕️</span>
            GP visits (3x)
          </div>
          <div className="spending-amount">$87</div>
        </div>
        <div className="spending-bar">
          <div className="spending-fill gp" style={{ width: '25%' }}></div>
        </div>

        <div className="spending-item">
          <div className="spending-label">
            <span className="spending-icon">🔬</span>
            Pathology / bloods
          </div>
          <div className="spending-amount">$54</div>
        </div>
        <div className="spending-bar">
          <div className="spending-fill pathology" style={{ width: '16%' }}></div>
        </div>

        <div className="spending-item">
          <div className="spending-label">
            <span className="spending-icon">🏥</span>
            Specialist (upcoming)
          </div>
          <div className="spending-amount negative">-$134</div>
        </div>
        <div className="spending-bar">
          <div className="spending-fill specialist" style={{ width: '39%' }}></div>
        </div>

        <div className="spending-total">
          <strong>Medicare saved you</strong>
          <strong className="savings">${mockHealthSummary.medicareRebateTotal} so far</strong>
        </div>
      </div>
    </div>
  );

  // Visit Notes Tab Content
  const renderVisitNotes = () => (
    <div className="visit-notes-tab">
      {mockVisits.map((visit) => (
        <div key={visit.id} className="visit-card">
          <div 
            className="visit-header"
            onClick={() => toggleVisit(visit.id)}
          >
            <div className="visit-icon">
              {visit.type === 'GP' && '👨‍⚕️'}
              {visit.type === 'Pathology' && '🔬'}
              {visit.type === 'Specialist' && '❤️'}
            </div>
            <div className="visit-info">
              <h4>{visit.type} {visit.doctorName && `— ${visit.doctorName}`}</h4>
              <p className="visit-location">{visit.location}</p>
            </div>
            <div className="visit-date-badge">
              {visit.date}
              <span className={`type-badge ${visit.type.toLowerCase()}`}>
                {visit.type}
              </span>
            </div>
          </div>

          {expandedVisitId === visit.id && (
            <div className="visit-details">
              {visit.presenting && (
                <p className="visit-presenting">{visit.presenting}</p>
              )}
              <p className="visit-notes">{visit.notes}</p>
              {visit.tags && visit.tags.length > 0 && (
                <div className="visit-tags">
                  {visit.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button className="ai-summarize-btn">
        Summarise all visits with AI ↗
      </button>
    </div>
  );

  // Timeline Tab Content
  const renderTimeline = () => (
    <div className="timeline-tab">
      {mockVisits.map((visit, index) => (
        <div key={visit.id} className="timeline-item">
          <div className="timeline-marker">
            {visit.tags?.includes('Upcoming') ? '⏸' : '✓'}
          </div>
          <div className="timeline-content">
            <div className="timeline-date">{visit.date}</div>
            <h4 className="timeline-title">
              {visit.type} {visit.doctorName && `— ${visit.doctorName}`}
            </h4>
            <p className="timeline-description">{visit.notes}</p>
          </div>
        </div>
      ))}

      <div className="timeline-item future">
        <div className="timeline-marker dots">⋯</div>
        <div className="timeline-content">
          <div className="timeline-date">TBD</div>
          <h4 className="timeline-title">Echocardiogram + results review</h4>
          <p className="timeline-description">Pending specialist recommendation.</p>
        </div>
      </div>

      <button className="ask-next-steps-btn">
        Ask about next steps ↗
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <Header hasNotifications={true} />

      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>
            ← 
          </button>
          <h1 className="page-title">Visit tracker</h1>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab ${activeTab === 'visit-notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('visit-notes')}
          >
            Visit notes
          </button>
          <button 
            className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'visit-notes' && renderVisitNotes()}
          {activeTab === 'timeline' && renderTimeline()}
        </div>
      </main>
    </div>
  );
}

export default VisitTrackerPage;