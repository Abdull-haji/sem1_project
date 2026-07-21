import { useEffect, useState } from 'react';
import heroOne from '../../pics/photo-1746288864318-aa0926e06763.jpg';
import heroTwo from '../../pics/photo-1642963036551-cf15c2dcab46.jpg';
import heroThree from '../../pics/photo-1626951876321-3b7137628f83.jpg';
import heroFour from '../../pics/photo-1603477849227-705c424d1d80.jpg';

// Default carousel slides if none are provided
const defaultSlides = [
  { title: 'Sun-kissed coastlines', image: heroOne },
  { title: 'Azure escape routes', image: heroTwo },
  { title: 'Private beach stories', image: heroThree },
  { title: 'Golden horizon escapes', image: heroFour },
];

function HeroCarousel({ slides = defaultSlides }) {
  const [active, setActive] = useState(0);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div key={slide.title} className={`hero-slide ${index === active ? 'active' : ''}`}>
          <img src={slide.image} alt={slide.title} />
          <div className="hero-overlay">
            <h3>{slide.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroCarousel;
