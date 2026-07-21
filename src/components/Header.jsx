import { useEffect, useState } from 'react';

function Header({ activeSection, onNavigate, visitorCount }) {
  const [location, setLocation] = useState('Detecting location...');

  // Grabs the visitor's coordinates on mount, falls back to a message if denied
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Location unavailable');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
      },
      () => {
        setLocation('Location unavailable');
      }
    );
  }, []);

  // Navigation menu items for scrolling to different sections
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'north', label: 'North' },
    { id: 'south', label: 'South' },
    { id: 'east', label: 'East' },
    { id: 'west', label: 'West' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'queries', label: 'Queries' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'sitemap', label: 'Site Map' },
  ];

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark glass-nav">
        <div className="container">
          <button className="btn btn-link text-white p-0 d-flex align-items-center gap-2" onClick={() => onNavigate('home')}>
            <span className="brand-mark">🌊</span>
            <span className="fw-semibold">BeautyOfBeaches</span>
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <button
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="top-bar text-white">
        <div className="container d-flex justify-content-between align-items-center py-2 flex-wrap gap-2">
          <span>Luxury coastal discovery</span>
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-light text-dark">Visitors {visitorCount}</span>
            <span className="badge bg-secondary">Location {location}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
