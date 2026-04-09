import './Header.css';

type HeaderProps = {
    onNotificationClick?:() => void;
    onSettingsClick?:() => void;
    onProfileClick?:() => void;
    hasNotifications?: boolean;
};

function Header ({
    onNotificationClick,
    onSettingsClick,
    onProfileClick,
    hasNotifications = false
}: HeaderProps) {
    return (
        <header className='Header'>
            <div className='header-brand'> HealthPath</div>
            <div className='header-actions'>
                <button className="icon-btn notification-btn" 
                    onClick={onNotificationClick}
                    aria-label="Notifications">
                        🔔
                        {hasNotifications && <span className="notification-dot"></span>}
                </button>
                <button 
                    className="icon-btn" 
                    onClick={onSettingsClick}
                    aria-label="Settings"
                    >
                    🌐
                </button>
                <button 
                    className="icon-btn" 
                    onClick={onProfileClick}
                    aria-label="Profile"
                    >
                    👤
                </button>
            </div>
        </header>
    )
}

export default Header;