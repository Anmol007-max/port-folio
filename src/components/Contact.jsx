import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiEnvelope, HiPhone, HiMapPin, HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { FaLinkedinIn } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';
import Tilt3DCard from './Tilt3DCard';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact" ref={ref} style={{ position: 'relative' }}>
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30,58,95,0.04), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating 3D ring decoration */}
      <motion.div
        className="section-deco section-deco-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="geo-ring" style={{ width: '60px', height: '60px' }} />
      </motion.div>

      <div className="container">
        <SectionHeading number="05" title="Get in Touch" />

        <Tilt3DCard
          className="contact-wrapper glass-card depth-shadow"
          tiltMax={3}
          glare={true}
          scale={1.005}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -4 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {contactItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href?.startsWith('http') ? '_blank' : undefined}
                      rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="contact-item"
                      initial={{ opacity: 0, x: -20, rotateY: -5 }}
                      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      style={{
                        cursor: item.href ? 'pointer' : 'default',
                        background: 'rgba(255,255,255,0.6)',
                        border: '1px solid rgba(255,255,255,0.8)',
                        padding: '1.2rem',
                        borderRadius: '16px',
                        transformStyle: 'preserve-3d',
                      }}
                      whileHover={item.href ? { x: 5, backgroundColor: 'rgba(255,255,255,0.9)', scale: 1.02 } : {}}
                    >
                      <div className="contact-item-icon">{item.icon}</div>
                      <div>
                        <div className="contact-item-label">{item.label}</div>
                        <div className="contact-item-value">{item.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 40, rotateY: 5 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Anmol Mishra"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Your Email</label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="anmolmishran0@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}
                  />
                </div>
                <MagneticButton className="btn-gradient" type="submit" style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </MagneticButton>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      background: status.type === 'success' ? 'rgba(45,106,79,0.1)' : 'rgba(196,89,58,0.1)',
                      color: status.type === 'success' ? 'var(--emerald)' : 'var(--rose)',
                      border: `1px solid ${status.type === 'success' ? 'rgba(45,106,79,0.2)' : 'rgba(196,89,58,0.2)'}`
                    }}
                  >
                    {status.type === 'success' ? <HiCheckCircle size={24} /> : <HiXCircle size={24} />}
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{status.message}</span>
                  </motion.div>
                )}
              </motion.form>
            </div>
          </motion.div>
        </Tilt3DCard>
      </div>
    </section>
  );
};

export default Contact;
