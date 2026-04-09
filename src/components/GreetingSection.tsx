// components/GreetingSection.tsx
import { type Language } from '../types';
import './GreetingSection.css';

type GreetingSectionProps = {
  userName: string;
  referringGP: string;
  medicareActive: boolean;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
};

const languages = [
  { code: 'en' as Language, flag: '🇬🇧', label: 'English' },
  { code: 'zh' as Language, flag: '🇨🇳', label: '中文' },
  { code: 'vi' as Language, flag: '🇻🇳', label: 'Tiếng Việt' },
];

function GreetingSection({
  userName,
  referringGP,
  medicareActive,
  selectedLanguage,
  onLanguageChange
}: GreetingSectionProps) {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  return (
    <section className="greeting-section">
      <p className="greeting-time">{getGreeting()}</p>
      <h1 className="user-name">{userName}</h1>
      <div className="user-info">
        <span>Referred by {referringGP}</span>
        <span className="separator">•</span>
        <span className={medicareActive ? 'medicare-active' : 'medicare-inactive'}>
          Medicare {medicareActive ? 'active' : 'inactive'}
        </span>
      </div>
      <div className="language-selector">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-flag ${selectedLanguage === lang.code ? 'active' : ''}`}
            onClick={() => onLanguageChange(lang.code)}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default GreetingSection;