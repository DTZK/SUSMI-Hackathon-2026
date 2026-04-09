// components/QuickActions.tsx
import { type QuickAction } from '../types';
import './QuickActions.css';

type QuickActionsProps = {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
};

function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <section className="quick-actions-section">
      <h2 className="section-title">QUICK ACTIONS</h2>
      
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button 
            key={action.id}
            className="quick-action-card"
            onClick={() => onActionClick(action)}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;