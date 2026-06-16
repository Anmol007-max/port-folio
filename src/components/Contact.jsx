import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { FaLinkedinIn } from 'react-icons/fa6';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const contactItems = [
  {
    icon: <HiEnvelope />,
    label: 'Email',
    value: 'anmolmishran0@gmail.com',
    href: 'mailto:anmolmishran0@gmail.com',
  },
  {
    icon: <HiPhone />,
    label: 'Phone',
    value: '+91-9555306497',
    href: 'tel:+919555306497',
  },
  {
    icon: <FaLinkedinIn />,
    label: 'LinkedIn',
    value: 'anmolmishra24',
    href: 'https://linkedin.com/in/anmolmishra24',
  },
  {
    icon: <HiMapPin />,
    label: 'Location',
    value: 'Kanpur, Uttar Pradesh, India',
    href: null,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:anmolmishran0@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <SectionHeading number="05" title="Get in Touch" />

        <motion.div
          className="contact-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-grid">
            <div className="contact-info">
              <motion.h3
                className="contact-info-title"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Let's build something{' '}
                <span className="gradient-text">amazing</span> together.
              </motion.h3>
              <motion.p
                className="contact-info-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>

              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{ cursor: item.href ? 'pointer' : 'default' }}
                >
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <MagneticButton className="btn-gradient" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Send Message</span>
              </MagneticButton>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
