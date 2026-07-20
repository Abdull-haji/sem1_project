import { useEffect, useMemo, useState } from 'react';
import beachData from './data/beaches.json';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import BeachCard from './components/BeachCard';
import GallerySection from './components/GallerySection';
import Ticker from './components/Ticker';
import DownloadButtons from './components/DownloadButtons';

import beachOne from '../pics/photo-1746288864318-aa0926e06763.jpg';
import beachTwo from '../pics/photo-1642963036551-cf15c2dcab46.jpg';
import beachThree from '../pics/photo-1626951876321-3b7137628f83.jpg';
import beachFour from '../pics/photo-1603477849227-705c424d1d80.jpg';
import beachFive from '../pics/photo-1586500036065-bdaeac7a4feb.jpg';
import beachSix from '../pics/photo-1579622754173-e2a9aad270e3.jpg';
import beachSeven from '../pics/photo-1556103727-777acb371272.jpg';
import beachEight from '../pics/photo-1551523713-c1473aa01d9f.jpg';
import beachNine from '../pics/photo-1551523713-c1473aa01d9f (1).jpg';
import beachTen from '../pics/photo-1545579133-99bb5ab189bd.jpg';
import beachEleven from '../pics/photo-1541417904950-b855846fe074.jpg';
import beachTwelve from '../pics/photo-1535262412227-85541e910204.jpg';
import beachThirteen from '../pics/photo-1531386450450-969f935bd522.jpg';
import beachFourteen from '../pics/photo-1461301214746-1e109215d6d3.jpg';

const allLocalImages = [
  beachOne,
  beachTwo,
  beachThree,
  beachFour,
  beachFive,
  beachSix,
  beachSeven,
  beachEight,
  beachNine,
  beachTen,
  beachEleven,
  beachTwelve,
  beachThirteen,
  beachFourteen,
];

const imageMap = {
  'photo-1746288864318-aa0926e06763.jpg': beachOne,
  'photo-1642963036551-cf15c2dcab46.jpg': beachTwo,
  'photo-1626951876321-3b7137628f83.jpg': beachThree,
  'photo-1603477849227-705c424d1d80.jpg': beachFour,
  'photo-1586500036065-bdaeac7a4feb.jpg': beachFive,
  'photo-1579622754173-e2a9aad270e3.jpg': beachSix,
  'photo-1556103727-777acb371272.jpg': beachSeven,
  'photo-1551523713-c1473aa01d9f.jpg': beachEight,
  'photo-1551523713-c1473aa01d9f (1).jpg': beachNine,
  'photo-1545579133-99bb5ab189bd.jpg': beachTen,
  'photo-1541417904950-b855846fe074.jpg': beachEleven,
  'photo-1535262412227-85541e910204.jpg': beachTwelve,
  'photo-1531386450450-969f935bd522.jpg': beachThirteen,
  'photo-1461301214746-1e109215d6d3.jpg': beachFourteen,
};

const zoneOrder = ['North', 'South', 'East', 'West'];

function OrgContact() {
  return (
    <div className="glass-card p-4">
      <p><strong>Email:</strong> hello@beautyofbeaches.com</p>
      <p><strong>Phone:</strong> +1 (800) 555-0123</p>
      <p><strong>Address:</strong> 88 Ocean Avenue, Palm Cove, CA 90210</p>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [visitorCount, setVisitorCount] = useState(1842);
  const [queryMessage, setQueryMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const beaches = useMemo(() => {
    return beachData.beaches.map((beach) => ({
      ...beach,
      image: imageMap[beach.image] || beachOne,
    }));
  }, []);

  useEffect(() => {
    const storedCount = Number(localStorage.getItem('beautyOfBeachesVisitors') || 0);
    const nextCount = storedCount + 1;
    localStorage.setItem('beautyOfBeachesVisitors', String(nextCount));
    setVisitorCount(nextCount);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="app-shell">
      <Header activeSection={activeSection} onNavigate={scrollToSection} visitorCount={visitorCount} />

      <main>
        <section id="home" className="section home-hero">
          <div className="container py-5">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <span className="eyebrow">Curated island escapes & coastal luxury</span>
                <h1 className="display-4 fw-bold mb-3">Discover the world’s most alluring beaches in style.</h1>
                <p className="lead text-muted mb-4">
                  From serene turquoise bays to dramatic cliffside shores, BeautyOfBeaches brings you a refined guide to epic coastal escapes.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('north')}>Explore Zones</button>
                  <button className="btn btn-outline-light btn-lg" onClick={() => scrollToSection('gallery')}>View Gallery</button>
                </div>
              </div>
              <div className="col-lg-6">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </section>

        {zoneOrder.map((zone) => (
          <section id={zone.toLowerCase()} className="section" key={zone}>
            <div className="container py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className="eyebrow">{zone} coast</span>
                  <h2 className="section-title">{zone} Beaches</h2>
                </div>
              </div>
              <div className="row g-4">
                {beaches.filter((beach) => beach.zone === zone).map((beach) => (
                  <div className="col-md-6 col-xl-4" key={beach.id}>
                    <BeachCard beach={beach} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="gallery" className="section">
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="eyebrow">Visual stories</span>
                <h2 className="section-title">Gallery</h2>
              </div>
            </div>
            <GallerySection images={allLocalImages} />
          </div>
        </section>

        <section id="about" className="section">
          <div className="container py-5">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <span className="eyebrow">About BeautyOfBeaches</span>
                <h2 className="section-title">A luxury guide for travelers who value unforgettable horizons.</h2>
                <p className="text-muted">
                  BeautyOfBeaches is a curated travel experience platform that blends premium storytelling, destination insights, and practical planning into one elegant experience. We spotlight globally celebrated coasts and help travelers discover the beauty, culture, and seasonal rhythm of every shore.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="glass-card p-4">
                  <h4 className="fw-semibold">What we offer</h4>
                  <ul className="list-unstyled mt-3">
                    <li>• Hand-picked beach recommendations</li>
                    <li>• Seasonal travel planning</li>
                    <li>• Premium destination inspiration</li>
                    <li>• Elegant digital travel guides</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <OrgContact />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="queries" className="section">
          <div className="container py-5">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <span className="eyebrow">Queries</span>
                <h2 className="section-title">Have a question about your next escape?</h2>
                <p className="text-muted">We’ll help you choose the ideal destination, ideal time, and travel style for your next coastal getaway.</p>
              </div>
              <div className="col-lg-7">
                <form className="glass-card p-4" onSubmit={(event) => { event.preventDefault(); setQueryMessage('Your query has been received. Our concierge will respond shortly.'); }}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="Ava Smith" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Question</label>
                    <textarea className="form-control" rows="4" placeholder="Tell us what you’d love to know about the beach destination." />
                  </div>
                  <button className="btn btn-primary" type="submit">Submit Query</button>
                  {queryMessage && <div className="form-message mt-3">{queryMessage}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="feedback" className="section">
          <div className="container py-5">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <span className="eyebrow">Feedback</span>
                <h2 className="section-title">Your thoughts shape our next journey.</h2>
                <p className="text-muted">Share your experience so we can keep curating more refined beach stories and recommendations.</p>
              </div>
              <div className="col-lg-7">
                <form className="glass-card p-4" onSubmit={(event) => { event.preventDefault(); setFeedbackMessage('Thank you for your feedback. We appreciate your insight.'); }}>
                  <div className="mb-3">
                    <label className="form-label">How did you enjoy the experience?</label>
                    <select className="form-select">
                      <option>Excellent</option>
                      <option>Very Good</option>
                      <option>Good</option>
                      <option>Needs Improvement</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comments</label>
                    <textarea className="form-control" rows="4" placeholder="Tell us what inspired you or what we can improve." />
                  </div>
                  <button className="btn btn-outline-light" type="submit">Send Feedback</button>
                  {feedbackMessage && <div className="form-message mt-3">{feedbackMessage}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-lg-5">
                <span className="eyebrow">Contact us</span>
                <h2 className="section-title">Plan your luxury beach escape with us.</h2>
                <OrgContact />
              </div>
              <div className="col-lg-7">
                <form className="glass-card p-4" onSubmit={(event) => { event.preventDefault(); setContactMessage('We will be in touch shortly with your tailored travel plan.'); }}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" placeholder="Jordan Reyes" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Preferred Destination</label>
                    <input className="form-control" placeholder="Malibu, Bali, Santorini..." />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="4" placeholder="Share your travel goals and preferred dates." />
                  </div>
                  <button className="btn btn-primary" type="submit">Contact Concierge</button>
                  {contactMessage && <div className="form-message mt-3">{contactMessage}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="sitemap" className="section">
          <div className="container py-5">
            <span className="eyebrow">Site map</span>
            <h2 className="section-title">Navigate the experience</h2>
            <div className="row g-4 mt-2">
              {['home', 'north', 'south', 'east', 'west', 'gallery', 'about', 'queries', 'feedback', 'contact'].map((link) => (
                <div className="col-sm-6 col-lg-4" key={link}>
                  <button className="btn btn-outline-light w-100 py-3" onClick={() => scrollToSection(link)}>{link.charAt(0).toUpperCase() + link.slice(1)}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="downloads" className="section">
          <div className="container py-5">
            <span className="eyebrow">Downloads</span>
            <h2 className="section-title">Download beach information</h2>
            <DownloadButtons beaches={beaches} />
          </div>
        </section>

        <section id="advertisement" className="section">
          <div className="container py-5">
            <span className="eyebrow">Travel offers</span>
            <h2 className="section-title">Luxury travel plans for every horizon</h2>
            <div className="row g-4 mt-2">
              {[
                { title: 'Flights', text: 'Private and premium flight bundles to selected coastal paradises.' },
                { title: 'Bus Services', text: 'Scenic overland routes with comfort-first travel experiences.' },
                { title: 'Travel Packages', text: 'All-inclusive beach retreats with concierge-level service.' },
              ].map((item) => (
                <div className="col-md-4" key={item.title}>
                  <div className="glass-card p-4 h-100">
                    <h4 className="fw-semibold">{item.title}</h4>
                    <p className="text-muted mt-3">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Ticker />
    </div>
  );
}

export default App;
