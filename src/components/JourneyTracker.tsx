// components/JourneyTracker.tsx
import { type CareJourney, type JourneyStep } from '../types';
import './JourneyTracker.css';

type JourneyTrackerProps = {
  journey: CareJourney;
  onJourneyClick?: () => void;
};

const journeySteps: Array<{ id: JourneyStep; label: string; icon: string }> = [
  { id: 'gp', label: 'GP visit', icon: '👨‍⚕️' },
  { id: 'referral', label: 'Referral', icon: '📄' },
  { id: 'specialist', label: 'Specialist', icon: '🏥' },
  { id: 'tests', label: 'Tests', icon: '🔬' },
  { id: 'care-plan', label: 'Care plan', icon: '📋' }
];

function JourneyTracker({ journey, onJourneyClick }: JourneyTrackerProps) {
  const getStepStatus = (stepId: JourneyStep): 'completed' | 'current' | 'upcoming' => {
    if (journey.completedSteps.includes(stepId)) return 'completed';
    if (journey.currentStep === stepId) return 'current';
    return 'upcoming';
  };

  const currentStepIndex = journeySteps.findIndex(step => step.id === journey.currentStep);
  const totalSteps = journeySteps.length;

  return (
    <section className="journey-section">
      <h2 className="section-title">YOUR CARE JOURNEY</h2>
      
      <div className="journey-card" onClick={onJourneyClick}>
        <h3 className="journey-pathway">{journey.pathway}</h3>
        
        {/* Journey Steps */}
        <div className="journey-steps">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="step-container">
              <div className={`step-circle ${getStepStatus(step.id)}`}>
                {getStepStatus(step.id) === 'completed' ? '✓' : index + 1}
              </div>
              <div className="step-label">{step.label}</div>
              {index < journeySteps.length - 1 && (
                <div className={`step-connector ${
                  getStepStatus(step.id) === 'completed' ? 'completed' : ''
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-text">
            Step {currentStepIndex + 1} of {totalSteps} — In progress
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${journey.progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{journey.progressPercentage}%</div>
        </div>
      </div>
    </section>
  );
}

export default JourneyTracker;