// components/BottomNav.tsx
import { type NavigationPage } from '../types';
import './BottomNav.css';

type BottomNavProps = {
  currentPage: NavigationPage;
  onPageChange: (page: NavigationPage) => void;
};

const navItems = [
  { id: 'home' as NavigationPage, icon: '🏠', label: 'Home' },
  { id: 'journey' as NavigationPage, icon: '📍', label: 'Journey' },
  { id: 'info' as NavigationPage, icon: 'ℹ️', label: 'Info' },  // CHANGED: Added Info
  { id: 'support' as NavigationPage, icon: '💬', label: 'Support' },
  { id: 'profile' as NavigationPage, icon: '👤', label: 'Profile' },
];

function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onPageChange(item.id)}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;