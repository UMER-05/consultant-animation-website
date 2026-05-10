import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [circleProgress, setCircleProgress] = useState(0);
  const [circleIndex, setCircleIndex] = useState(0);

  const circleItems = [
    {
      title: 'Executive alignment',
      description: 'A seamless narrative from boardroom to execution, designed to move leadership and operating teams toward a unified agenda.',
      leftImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80',
      rightImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80'
    },
    {
      title: 'Market opportunity clarity',
      description: 'Signal-driven insight that helps you see where value is building and which moves unlock the greatest momentum.',
      leftImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
      rightImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80'
    },
    {
      title: 'Growth scenario design',
      description: 'A concise portfolio of opportunities, scenarios and growth levers that keep the business moving with precision.',
      leftImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      rightImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=900&q=80'
    },
    {
      title: 'Value capture momentum',
      description: 'Tangibly measurable steps and a change-ready execution plan for accelerating performance at every layer.',
      leftImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      rightImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
    }
  ];

  // Scroll-based reveal animation using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && entry.intersectionRatio > 0.2) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar and header background
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScroll;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCircleSection = () => {
      const section = document.getElementById('circle');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const startPoint = window.innerHeight * 0.0000001;
      const endPoint = -sectionHeight * 0.3;
      const raw = (startPoint - rect.top) / (startPoint - endPoint);
      const progress = Math.max(0, Math.min(1, raw));
      const index = Math.min(circleItems.length - 1, Math.floor(progress * circleItems.length));
      setCircleProgress(progress);
      setCircleIndex(index);
    };

    updateCircleSection();
    window.addEventListener('scroll', updateCircleSection);
    window.addEventListener('resize', updateCircleSection);
    return () => {
      window.removeEventListener('scroll', updateCircleSection);
      window.removeEventListener('resize', updateCircleSection);
    };
  }, [circleItems.length]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  const servicesData = [
    { icon: "📊", title: "Strategic Roadmapping", description: "Comprehensive multi-year transformation plans aligned with shareholder value creation and market positioning." },
    { icon: "🤝", title: "M&A Advisory", description: "End-to-end due diligence, integration strategy, and post-merger value capture optimization." },
    { icon: "🚀", title: "Growth Acceleration", description: "Data-driven go-to-market strategies, pricing optimization, and revenue model innovation." },
    { icon: "🧠", title: "Operational Excellence", description: "Lean process redesign, cost transformation, and agile governance frameworks." }
  ];

  const testimonialsData = [
    {
      text: "Alexander's strategic insight transformed our entire approach to market expansion. Within 12 months, we saw a 47% increase in enterprise value. His ability to see around corners is unparalleled.",
      name: "Victoria Chen",
      role: "CEO, Meridian Capital",
      company: "Meridian Capital",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      text: "A true partner who brings both analytical rigor and creative vision. He helped us navigate a complex merger with exceptional finesse, saving us over $50M in integration costs.",
      name: "James Whitfield",
      role: "Chairman",
      company: "Whitfield Industries",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      text: "The clarity and framework Alexander provided were instrumental in our successful IPO. His guidance through the due diligence process was invaluable to our leadership team.",
      name: "Dr. Sarah Okonkwo",
      role: "Founder & CTO",
      company: "NovaTech",
      image: "https://randomuser.me/api/portraits/women/89.jpg"
    },
    {
      text: "Working with Alexander elevated our strategic thinking to a new level. His deep industry knowledge and practical approach delivered measurable results within the first quarter.",
      name: "Michael Torres",
      role: "President",
      company: "Torres Group",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  return (
    <div className="app">
      {/* Scroll Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
      
      {/* Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <h1 className="logo-text">Alexander<span className="gold-accent">.</span>Reed</h1>
            <p className="logo-sub">STRATEGIC CONSULTANCY</p>
          </div>
          <nav className="nav">
            {['home', 'services', 'testimonials', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? 'nav-link-active' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          <button className="cta-button" onClick={() => scrollToSection('contact')}>
            Let's Talk
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="reveal-on-scroll hero-content" data-section="home">
              <p className="hero-badge">✦ PARTNER & EXECUTIVE ADVISOR</p>
              <h2 className="hero-title">
                Navigating Complexity,<br />
                Delivering <span className="gold-accent">Exceptional Results</span>
              </h2>
              <p className="hero-description">
                For over two decades, I've partnered with CEOs and boards to transform challenges 
                into opportunities, driving sustainable growth and operational excellence across 
                global markets.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                  Schedule Consultation <span className="arrow">→</span>
                </button>
                <button className="btn-secondary" onClick={() => scrollToSection('services')}>
                  Discover My Approach
                </button>
              </div>
            </div>
            <div className="reveal-on-scroll hero-visual" data-section="home">
              <div className="stats-card">
                <div className="stats-icon">📈</div>
                <div className="stat-item">
                  <h3 className="stat-number">$2.8B+</h3>
                  <p className="stat-label">Client Value Created</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">98%</h3>
                  <p className="stat-label">Client Retention Rate</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">25+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="reveal-on-scroll section-header" data-section="services">
            <p className="section-subtitle">WHAT I OFFER</p>
            <h2 className="section-title">Premium <span className="gold-accent">Consulting Services</span></h2>
            <p className="section-description">Tailored strategic solutions for discerning leaders</p>
          </div>
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div key={index} className="reveal-on-scroll service-card" data-section="services">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-link" onClick={() => scrollToSection('contact')}>
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Circle Scroll Section */}
      <section id="circle" className="section circular-section">
        <div className="container">
          <div className="circle-scroll-area">          
            <h2 className="section-title">Two aligned views that move with strategic momentum</h2>
                        <p className="section-description">One side tracks executive perspective and the other tracks delivery detail, with the visual system updating as you scroll through the section.</p>
                        <p className="section-subtitle">STRATEGIC SIGNALS</p>

            <div className="circle-sticky">
              <div className="circle-layout">
                {/* <div className="circle-panel left" style={{ transform: `rotate(${circleProgress * 35}deg)` }}>
                  <div className="circle-frame">
                    {circleItems.map((item, index) => (
                      <div
                        key={index}
                        
                        className={`circle-thumb thumb-${index} ${circleIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${item.leftImage})` }}
                      />
                    ))}
                  </div>
                </div> */}

                <div className="circle-copy">
                  <div className="circle-stats">
                    <h3>{circleItems[circleIndex].title}</h3>
                    <p>{circleItems[circleIndex].description}</p>
                  </div>
                  <div className="circle-progress">
                    {circleItems.map((_, idx) => (
                      <span key={idx} className={`progress-dot ${circleIndex === idx ? 'active' : ''}`} />
                    ))}
                  </div>
                </div>

                <div className="circle-panel right" style={{ transform: `rotate(${circleProgress * -35}deg)` }}>
                  <div className="circle-frame">
                    {circleItems.map((item, index) => (
                      <div
                        key={index}
                        className={`circle-thumb thumb-${index} ${circleIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${item.rightImage})` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <div className="reveal-on-scroll section-header" data-section="testimonials">
            <p className="section-subtitle">CLIENT TESTIMONIALS</p>
            <h2 className="section-title">Trusted by <span className="gold-accent">Industry Leaders</span></h2>
            <p className="section-description">What executives say about working together</p>
          </div>
          <div className="testimonials-grid">
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="reveal-on-scroll testimonial-card" data-section="testimonials">
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-image"
                    loading="lazy"
                  />
                  <div className="testimonial-author-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="quote-icon">"</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-rating">
                  <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal-on-scroll contact-info" data-section="contact">
              <p className="section-subtitle">GET IN TOUCH</p>
              <h2 className="section-title">Let's Start a <span className="gold-accent">Conversation</span></h2>
              <p className="contact-description">
                Whether you're navigating a critical transition, preparing for growth, 
                or seeking a trusted strategic partner, I'm here to help you achieve clarity and results.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>hello@alexanderreed.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+44 (212) 555-7890</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span> Berkeley Square, London</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">tw</a>
                <a href="#" className="social-link">md</a>
              </div>
            </div>
            <form 
              className="reveal-on-scroll contact-form" 
              data-section="contact"
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Thank you for your message! I'll respond within 24 hours."); 
                e.target.reset(); 
              }}
            >
              <input type="text" placeholder="Full Name" className="form-input" required />
              <input type="email" placeholder="Email Address" className="form-input" required />
              <input type="text" placeholder="Company Name" className="form-input" />
              <select className="form-input">
                <option value="">How can I help?</option>
                <option>Strategic Planning</option>
                <option>M&A Advisory</option>
                <option>Growth Strategy</option>
                <option>Operational Excellence</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Tell me about your strategic needs..." className="form-textarea" rows="4" required></textarea>
              <button type="submit" className="submit-btn">Send Message →</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <h3 className="footer-logo">Alexander<span className="gold-accent">.</span>Reed</h3>
              <p className="footer-tagline">Strategic clarity for extraordinary outcomes</p>
            </div>
            <div className="footer-links">
              <button onClick={() => scrollToSection('home')}>Home</button>
              <button onClick={() => scrollToSection('services')}>Services</button>
              <button onClick={() => scrollToSection('testimonials')}>Testimonials</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>
            <p className="footer-copyright">© 2024 Alexander Reed Consulting — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
