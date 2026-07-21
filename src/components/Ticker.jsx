import { useEffect, useState } from 'react';

function Ticker() {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState('Location unavailable');

  // Updates clock every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetches location on mount, shows permission error if denied
  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
      },
      () => setLocation('Location permission denied'),
      { timeout: 5000 }
    );
    return () => {
      // getCurrentPosition has no watcher id to clear; nothing to cleanup
    };
  }, []);

  const text = `Date: ${dateTime.toLocaleDateString()} • Time: ${dateTime.toLocaleTimeString()} • Location: ${location}`;

  return (
    <div className="ticker-bar">
      <div className="container py-3">
        <span className="ticker-scroll">{text}</span>
      </div>
    </div>
  );
}

export default Ticker;
