// pages/InfoHubPage.tsx
import { useState } from 'react';
import type { NavigationPage } from '../types';
import { mockInfoTopics, mockCostGuide } from '../mockData';
import Header from '../components/Header';
import './InfoHubPage.css';

type TabType = 'how-it-works' | 'eligibility' | 'cost-guide';
type EligibilityStep = 'start' | 'care-type' | 'medicare-status' | 'result';
type InfoHubPageProps = {
  onNavigate?: (page: NavigationPage) => void;
};

function InfoHubPage({ onNavigate }: InfoHubPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('how-it-works');
  const [searchQuery] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  
  // Eligibility checker state
  const [eligibilityStep, setEligibilityStep] = useState<EligibilityStep>('start');
  const [careType, setCareType] = useState<string>('');
  const [hasMedicare, setHasMedicare] = useState<boolean | null>(null);

  const handleBackClick = () => {
    console.log('Navigate back');
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const filteredTopics = mockInfoTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Eligibility Checker Logic
  const startEligibilityCheck = () => {
    setEligibilityStep('care-type');
    setCareType('');
    setHasMedicare(null);
  };

  const selectCareType = (type: string) => {
    setCareType(type);
    setEligibilityStep('medicare-status');
  };

  const selectMedicareStatus = (status: boolean) => {
    setHasMedicare(status);
    setEligibilityStep('result');
  };

  const resetEligibility = () => {
    setEligibilityStep('start');
    setCareType('');
    setHasMedicare(null);
  };

  // How It Works Tab
  const renderHowItWorks = () => (
    <div className="how-it-works-tab">
      {/* <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search e.g. 'What is bulk billing?'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      <p className="tab-description">
        Tap any topic to learn more in plain English.
      </p>

      <div className="topics-list">
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <button
              className="topic-header"
              onClick={() => toggleTopic(topic.id)}
            >
              <div className="topic-icon">{topic.icon}</div>
              <div className="topic-title">{topic.title}</div>
              <div className="topic-arrow">›</div>
            </button>
            
            {expandedTopic === topic.id && (
              <div className="topic-content">
                {topic.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Eligibility Checker Tab
  const renderEligibility = () => (
    <div className="eligibility-tab">
      {eligibilityStep === 'start' && (
        <div className="eligibility-start">
          <h3>CHECK YOUR ELIGIBILITY</h3>
          <p>Answer a few quick questions to understand your billing options and expected costs.</p>
          <button className="start-btn" onClick={startEligibilityCheck}>
            Start
          </button>
        </div>
      )}

      {eligibilityStep === 'care-type' && (
        <div className="eligibility-question">
          <div className="progress-indicator">
            <span className="progress-dot active"></span>
            <span className="progress-dot"></span>
            <span className="progress-dot"></span>
          </div>
          <p className="step-label">Step 1 of 3</p>
          <h3>What type of care are you looking for?</h3>
          <p className="help-text">This helps us show your billing options and expected costs.</p>
          
          <div className="options-grid">
            <button 
              className="option-card"
              onClick={() => selectCareType('gp')}
            >
              <div className="option-title">GP or general check-up</div>
              <div className="option-subtitle">Routine care, referrals</div>
            </button>
            <button 
              className="option-card"
              onClick={() => selectCareType('specialist')}
            >
              <div className="option-title">Specialist or hospital</div>
              <div className="option-subtitle">Referred specialist care</div>
            </button>
            <button 
              className="option-card"
              onClick={() => selectCareType('mental-health')}
            >
              <div className="option-title">Mental health or allied health</div>
              <div className="option-subtitle">Physio, psychology, dietitian</div>
            </button>
            <button 
              className="option-card"
              onClick={() => selectCareType('dental')}
            >
              <div className="option-title">Dental, optical or hearing</div>
              <div className="option-subtitle">Not usually covered by Medicare</div>
            </button>
          </div>
        </div>
      )}

      {eligibilityStep === 'medicare-status' && (
        <div className="eligibility-question">
          <div className="progress-indicator">
            <span className="progress-dot completed">✓</span>
            <span className="progress-dot active"></span>
            <span className="progress-dot"></span>
          </div>
          <p className="step-label">Step 2 of 3</p>
          <h3>Do you have a Medicare card?</h3>
          
          <div className="options-grid">
            <button 
              className="option-card"
              onClick={() => selectMedicareStatus(true)}
            >
              <div className="option-title">✓ Yes, I have Medicare</div>
            </button>
            <button 
              className="option-card"
              onClick={() => selectMedicareStatus(false)}
            >
              <div className="option-title">✗ No Medicare</div>
            </button>
          </div>
        </div>
      )}

      {eligibilityStep === 'result' && (
        <div className="eligibility-result">
          <div className="result-header">
            <h3>BULK BILLING AVAILABLE</h3>
            {hasMedicare && careType === 'gp' && (
              <div className="result-card">
                <h4>GP visit — Medicare eligible</h4>
                <div className="result-details">
                  <div className="result-row">
                    <span>Billing type</span>
                    <strong>Bulk bill or mixed</strong>
                  </div>
                  <div className="result-row">
                    <span>Medicare rebate</span>
                    <strong className="green">$42.85</strong>
                  </div>
                  <div className="result-row">
                    <span>Your cost (bulk bill)</span>
                    <strong className="green">$0</strong>
                  </div>
                  <div className="result-row">
                    <span>Your cost (gap)</span>
                    <strong>$0 – $45</strong>
                  </div>
                  <div className="result-row">
                    <span>Medicare card needed</span>
                    <strong>Yes</strong>
                  </div>
                </div>
                
                <div className="tip-box">
                  <strong>💡 Tip:</strong> Always call ahead to confirm if a clinic bulk bills — policies can change. Ask specifically before booking.
                </div>
              </div>
            )}
            
            {hasMedicare && careType === 'specialist' && (
              <div className="result-card">
                <h4>Specialist consult</h4>
                <div className="result-details">
                  <div className="result-row">
                    <span>Billing type</span>
                    <strong>Gap fee</strong>
                  </div>
                  <div className="result-row">
                    <span>Full specialist fee</span>
                    <strong>~$295</strong>
                  </div>
                  <div className="result-row">
                    <span>GP referral needed</span>
                    <strong>Yes</strong>
                  </div>
                  <div className="result-row">
                    <span>Private cover helps</span>
                    <strong>If hospitalised</strong>
                  </div>
                </div>
                
                <div className="tip-box">
                  <strong>💡 Tip:</strong> If specialist fees are high, ask your GP for a referral to a public hospital outpatient clinic — it's free with Medicare.
                </div>
              </div>
            )}
            
            <div className="result-actions">
              <button className="secondary-btn" onClick={resetEligibility}>
                Start again
              </button>
              <button className="primary-btn">
                Ask AI for advice ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Cost Guide Tab
  const renderCostGuide = () => (
    <div className="cost-guide-tab">
      <h3>ESTIMATED COSTS FOR YOUR VISIT</h3>
      
      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Bulk bill</button>
        <button className="filter-tab">Specialist</button>
        <button className="filter-tab">Allied health</button>
      </div>

      <div className="cost-cards">
        {mockCostGuide.map((item, index) => (
          <div key={index} className="cost-card">
            <div className="cost-card-header">
              <div className="cost-category-icon">
                {item.category === 'GP' && '👨‍⚕️'}
                {item.category === 'Specialist' && '🏥'}
                {item.category === 'Pathology' && '🔬'}
                {item.category === 'Imaging' && '📷'}
                {item.category === 'Dental' && '🦷'}
                {item.category === 'Allied Health' && '💪'}
              </div>
              <div className="cost-card-info">
                <h4>{item.service}</h4>
                {item.bulkBilled && (
                  <span className="bulk-bill-badge">Bulk bill</span>
                )}
              </div>
            </div>

            <div className="cost-breakdown">
              <div className="cost-row">
                <span>Full fee</span>
                <strong>${item.fullFee}</strong>
              </div>
              <div className="cost-bar">
                <div 
                  className="cost-bar-fill medicare"
                  style={{ width: `${(item.medicareRebate / item.fullFee) * 100}%` }}
                ></div>
              </div>
              <div className="cost-row small">
                <span>● Medicare pays</span>
                <span className="green">${item.medicareRebate}</span>
              </div>
              {item.mbsCode && (
                <div className="cost-row small">
                  <span>MBS {item.mbsCode}</span>
                </div>
              )}
              <div className="gap-fee-row">
                <span>Gap fee range</span>
                <strong>{item.typicalGapFee}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cost-note">
        <p><strong>Note:</strong> These are typical 2025 costs based on the Medicare Benefits Schedule (MBS). 
        Actual fees vary by provider. Always confirm costs when booking.</p>
      </div>
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
          <h1 className="page-title">Info hub</h1>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'how-it-works' ? 'active' : ''}`}
            onClick={() => setActiveTab('how-it-works')}
          >
            How it works
          </button>
          <button 
            className={`tab ${activeTab === 'eligibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('eligibility')}
          >
            Eligibility
          </button>
          <button 
            className={`tab ${activeTab === 'cost-guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('cost-guide')}
          >
            Cost guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'how-it-works' && renderHowItWorks()}
          {activeTab === 'eligibility' && renderEligibility()}
          {activeTab === 'cost-guide' && renderCostGuide()}
        </div>
      </main>
    </div>
  );
}

export default InfoHubPage;