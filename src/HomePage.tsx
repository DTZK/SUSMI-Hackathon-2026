import React from 'react';
import { useState } from 'react';
import './HomePage.css';

// Define the type for our page sections
type Section = 'home' | 'section 1' | 'section 2' ;

function HomePage(){
    const [activeSection, setActiveSection] = useState<Section>('home');

    const renderContent= () => {
        switch (activeSection){
            case 'home':
                return (
                    <div className='section-content'>
                        <h1>This is the website</h1>
                        <p>Make an Introduction</p>
                        
                    </div>
                );
            
            case 'section 1':
                return (
                    <div className='section-content'>
                        <h1> insert stuff</h1>
                        <p>Ask what to insert here</p>
                    </div>
                );

            case 'section 2':
                return (
                    <div className='section-content'>
                        <h1> insert stuff</h1>
                        <p>Ask what to insert here</p>
                    </div>
                )
            
            default:
                return <div>Page Not Found</div>;
        }
    };

    return (
        <div className='homepage-container'>
            {/* Navigation Bar */}
            <nav className="navbar">
                 <div className="nav-brand">MyWebsite</div>
                 <ul className='nav-menu'>
                    <li>
                        <button className={activeSection === 'home' ? 'nav-link active' : 'nav-link'}
                        onClick={() => setActiveSection('home')}>
                            Home
                        </button>
                    </li>

                    <li>
                        <button className={activeSection === 'section 1' ? 'nav-link active' : 'nav-link'}
                        onClick={() => setActiveSection('section 1')}>
                            section 1
                        </button>
                    </li>

                    <li>
                        <button className={activeSection === 'section 2' ? 'nav-link active' : 'nav-link'}
                        onClick={() => setActiveSection('section 2')}>
                            section 2
                        </button>
                    </li>
                 </ul>
            </nav>
            {/* Main Content */}
            <main className="main-content">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 MyWebsite. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default HomePage;